import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validareemail from 'App/Models/Validareemail'
import Clinica from 'App/Models/Clinica'
import user from 'App/Models/user'
import Database from '@ioc:Adonis/Lucid/Database'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Mail from '@ioc:Adonis/Addons/Mail'
import { DateTime } from 'luxon';
import Env from '@ioc:Adonis/Core/Env'
import Factura from 'App/Models/Factura'
const puppeteer = require('puppeteer');
const stripe = require("stripe")(Env.get('STRIPE_SECRET_KEY'))

export default class ClientsController {

public async validare_email({request}: HttpContextContract){
    let {email} =request.body();
    const random = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    let d = {cod:random.toString(),email}
    await Validareemail.create(d);
    //console.log('Validare email!',validare)

    await Mail.send((message) => {
        message
          .from('programari@eleventen.ro')
          .to(email)
          .subject('Cod verificare email')
          .htmlView('emails/validareemail', { cod:random.toString() })
      })

    return 'Validare email!'
}
public async oproforma({params,view}:HttpContextContract){
    const proforma =await Factura.findOrFail(params.idfact)
    //console.log(proforma)
    return view.render('facturaproforma',{nrfact:proforma.nrfact,data:DateTime.fromJSDate(new Date(proforma.data)).toFormat('dd.MM.yyyy'),numeclient:proforma.numeclient,cuiclient:proforma.cuiclient,adresaclient:proforma.adresaclient,detalii:proforma.detalii,suma:proforma.suma,tip:proforma.tip})
}



public async activeazaabonament({params}:HttpContextContract){
     //console.log(params.slug)
     const NOW = DateTime.now()
     const clinica = await Clinica.findBy('slug',params.slug);
     const saminta = 111000;
     const facturi = await Database.from('facturas').select('facturas.*').where({'facturas.tip':'fiscala'})
     let idfacturanoua:number=0
    // console.log(facturi.length)
     if(clinica){
        //console.log(clinica.denumire,clinica.stoptrial,clinica.stoptrial.plus({days:366}))
      //  const plan= await Database.from('plans').select('plans.*').where({'plans.id':clinica.idplan})
        const c = await Database
        .from('clinicas')  
        .join('plans','clinicas.idplan','=','plans.id')
        .select('clinicas.*')
        .select({numeplan:'plans.denumire',tarif:'plans.tariflunar'})
        .where({'clinicas.id':clinica.id})

        const ff={
            data:NOW.toSQLDate(),
            tip:'fiscala',
            nrfact:'LS '+(saminta+1+facturi.length),
            numeclient:clinica.companie,
            cuiclient:c[0].CUI,
            adresaclient:clinica.adresacompanie,
            detalii:'Contravaloare abonament plan '+c[0].numeplan+' 12 luni la platforma programari online + offline elEvenTen Romania ',
            suma:c[0].tarif*12,
            idclinica:clinica.id
        }
     
        await clinica
            .merge({stare:'activ',startabonament:clinica.stoptrial,stopabonament:clinica.stoptrial.plus({days:366})})
            .save()
        const facturanoua= await Factura.create(ff)    
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        idfacturanoua=facturanoua.id
        await page.goto(`http://localhost:3339/facturiproforme/${facturanoua.id}`, { waitUntil: 'networkidle0' })
       // await page.setContent(html)
        await page.emulateMediaType('screen')
        const pdf = await page.pdf({ format: 'a4' })
        await browser.close()
       // console.log(facturanoua.id)

       
       await Mail.send((message) => {
        message
          .from('noreply@eleventen.ro')
          .to(clinica.email)
          .subject('Factura fiscala abonament platforma elEvenTen - programari online si offline')
          .attachData(pdf, { filename: `facturafiscala_${ff.nrfact}.pdf` })
          .htmlView('emails/activare')
      })
     }
     
     return {mesaj:'Abonament clinica activat!',idfacturanoua}
}

public async succesplata({request,view}:HttpContextContract){
  const q = request.qs();
  //console.log(q.cid,q.ta)
  const NOW = DateTime.now()
  const clinica = await Clinica.findOrFail(q.cid);
  const saminta = 111000;
  const facturi = await Database.from('facturas').select('facturas.*').where({'facturas.tip':'fiscala'})
  let idfacturanoua:number=0
 // console.log(facturi.length)
  if(clinica){
     //console.log(clinica.denumire,clinica.stoptrial,clinica.stoptrial.plus({days:366}))
   //  const plan= await Database.from('plans').select('plans.*').where({'plans.id':clinica.idplan})
     const c = await Database
     .from('clinicas')  
     .join('plans','clinicas.idplan','=','plans.id')
     .select('clinicas.*')
     .select({numeplan:'plans.denumire',tarif:'plans.tariflunar'})
     .where({'clinicas.id':clinica.id})

     const ff={
         data:NOW.toSQLDate(),
         tip:'fiscala',
         nrfact:'LS '+(saminta+1+facturi.length),
         numeclient:clinica.companie,
         cuiclient:c[0].CUI,
         adresaclient:clinica.adresacompanie,
         detalii:'Contravaloare abonament plan '+c[0].numeplan+' 12 luni la platforma programari online + offline elEvenTen Romania ',
         suma:c[0].tarif*12,
         idclinica:clinica.id
     }
  
     await clinica
         .merge({stare:'activ',startabonament:clinica.stoptrial,stopabonament:clinica.stoptrial.plus({days:366})})
         .save()
     const facturanoua= await Factura.create(ff)    
     const browser = await puppeteer.launch()
     const page = await browser.newPage()
     idfacturanoua=facturanoua.id
     await page.goto(`http://localhost:3339/facturiproforme/${facturanoua.id}`, { waitUntil: 'networkidle0' })
    // await page.setContent(html)
     await page.emulateMediaType('screen')
     const pdf = await page.pdf({ format: 'a4' })
     await browser.close()
    // console.log(facturanoua.id)

    
    await Mail.send((message) => {
     message
       .from('noreply@eleventen.ro')
       .to(clinica.email)
       .subject('Factura fiscala abonament platforma elEvenTen - programari online si offline')
       .attachData(pdf, { filename: `facturafiscala_${ff.nrfact}.pdf` })
       .htmlView('emails/activare')
   })
  }
  return view.render('succesplata')
}

public async platacard({request,response}:HttpContextContract){
 
  const abonamente = await Database.from('plans').select('plans.*')
  let idclinica  = request.headers().idclinica;
 

  const storeItems = new Map(
  abonamente.map(a=>{

        return [a.id,{priceInCents: a.tariflunar*12*100, name: 'Pachet abonament '+a.denumire+' 12 luni platforma programari consult medical eleventen.ro' }]
  })  


  )

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: request.body().items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "ron",
            product_data: {
              name: storeItem?.name,
            },
            unit_amount: storeItem?.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `http://localhost:3339/succesplata?cid=${idclinica}&ta=`+request.body().items[0].id,
      cancel_url: `https://eleventen.ro`,
    })
    return { url: session.url }
  } catch (e) {
    response.status(500).json({ error: e.message })
  }

    
   
    
   
}

public async inregistrareclinica({request,session,view}:HttpContextContract){
  //let clinica_noua=request.body()
  
     const validare_solicitare = schema.create(
      {
          nume:schema.string({trim:true},[rules.maxLength(70),rules.minLength(7)]),
          clinica:schema.string({trim:true},[rules.maxLength(70),rules.minLength(7)]),
          codfiscal:schema.string({trim:true},[rules.maxLength(10),rules.minLength(6),rules.cuivalid()]),
          denumirepj:schema.string({trim:true},[rules.maxLength(100),rules.minLength(5)]),
          adresapj:schema.string({trim:true},[rules.maxLength(100),rules.minLength(6)]),
          cod:schema.string({trim:true},[rules.maxLength(6),rules.minLength(6)]),
          email:schema.string({trim:true},[rules.email()]),
          parola:schema.string({trim:true},[rules.minLength(8),rules.regex(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]),
          idplan:schema.number()
        //  acord:schema.string.optional({trim:true})
      })
      if(request.input('acord')=="on"){
        //console.log(request.body())
      const solicitare_validata = await request.validate({
        schema:validare_solicitare,
        messages:{
            'nume.required':"Introduceti un nume valid",
            "nume.minLength":"Numele nu poate fi mai mic de 7 caractere!",
            "nume.maxLength":"Numele nu poate depasi 70 de caractere!",
            'codfiscal.required':"Introduceti un cod fiscal valid",
            "codfiscal.minLength":"Codul fiscal nu poate fi mai mic de 6 caractere!",
            "codfiscal.maxLength":"Codul fiscal nu poate depasi 10 de caractere!",
            'denumirepj.required':"Introduceti un nume de firma valid",
            "denumirepj.minLength":"Numele firmei nu poate fi mai mic de 5 caractere!",
            'adresapj.required':"Introduceti o adresa valida",
            "adresapj.minLength":"Adresa firmei nu poate fi mai mica de 6 caractere!",
            'clinica.required':"Introduceti un nume de clinica valid",
            "clinica.minLength":"Numele clinicii nu poate fi mai mic de 7 caractere!",
            "clinica.maxLength":"Numele clinicii nu poate depasi 70 de caractere!",
            "cod.required":"Cod validare email obligatoriu",
            "cod.minLength":"Cod validare email invalid",
            "cod.maxLength":"Cod validare email invalid",
            "email.required":"Adresa de email este obligatorie",
            "email.email":"Adresa de e-mail invalida",
            'parola.required':"Introduceti o parola valida",
            "parola.minLength":"Parola nu respecta cerintele minime de securitate",
            "parola.regex":"Parola nu respecta cerintele minime de complexitate"
        }
    });
   // console.log(solicitare_validata)
   /* var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let mailvalid=clinica_noua.email.match(mailformat)
    if(!mailvalid)
    session.flash('mailinvalid','Adresa de email invalida')*/
    const clinicaexistenta = await Database
    .from('clinicas')
    .select('*')
    .where('email', solicitare_validata.email)
    .orderBy('id','desc')
    .first()

    if(clinicaexistenta) return view.render('bunvenit',{succes:false,mesaj:'Mai exista o clinica/cabinet inregistrata cu aceasta adresa de e-mail! Va rugam reluati procedura de inregistrare!'})
   const linie= await Database
                .from('validareemails')
                .select('*')
                .where('email', solicitare_validata.email)
                .orderBy('id','desc')
                .first()

             //   console.log(linie)
    if(linie&&solicitare_validata.cod==linie.cod){
        //adaug clinica 
        const slug=Math.floor(Math.random() * Date.now()).toString(16)
        const clinicanoua={
            'denumire':solicitare_validata.clinica,
            email:solicitare_validata.email,
            companie:solicitare_validata.denumirepj,
            CUI:solicitare_validata.codfiscal,
            adresacompanie:solicitare_validata.adresapj,
            emailpr:solicitare_validata.email,
            slug,
            idplan:solicitare_validata.idplan,
            stare:'trial',
            starttrial:DateTime.now(),
            stoptrial:DateTime.now().plus({days:31}),
            urlpol:Env.get('DOMENIU_BAZA')
        }
        const nouaclinica= await Clinica.create(clinicanoua);
        
        
        // adaug user cu rol de admin
        const admin_nou={
            email:solicitare_validata.email,
            nume:'admin',
            numeintreg:solicitare_validata.nume,
            numeunic:'admin'+nouaclinica.id,
            rol:'admin',
            password:solicitare_validata.parola,
            idclinica:nouaclinica.id,
            createdby:0
        }
        await user.create(admin_nou) 

         //trimit email la client cu toate linkurile
            const link_formular_solicitare="https://eleventen.live/solicitareprogramare/"+slug
            const link_app_administrare = `${clinicanoua.urlpol}/admin1975/#/${slug}`
            await Mail.send((message) => {
                message
                  .from('programari@eleventen.ro')
                  .to(solicitare_validata.email)
                  .subject('Cont creat platforma elEvenTen si date de acces')
                  .htmlView('emails/imbarcare', { link1:link_formular_solicitare,link2:link_app_administrare ,stoptrial:clinicanoua.stoptrial.setLocale('en-gb').toLocaleString()})
              })

        return view.render('bunvenit',{succes:true})
    }
    else
    {
        return view.render('bunvenit',{succes:false,mesaj:'Adresa de email nu a putut fi verificata! Va rugam reluati procedura de inregistrare!'})
    }
}
else {
    return view.render('bunvenit',{succes:false,mesaj:'Trebuie sa fiti de acord cu Termeni si Conditii si cu Politica de Confidentialitate pentru a continua!'})
}

}
}
