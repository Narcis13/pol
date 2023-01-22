import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validareemail from 'App/Models/Validareemail'
import Clinica from 'App/Models/Clinica'
import user from 'App/Models/user'
import Database from '@ioc:Adonis/Lucid/Database'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Mail from '@ioc:Adonis/Addons/Mail'
import { DateTime } from 'luxon';
import Env from '@ioc:Adonis/Core/Env'

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

public async inregistrareclinica({request,session,view}:HttpContextContract){
  let clinica_noua=request.body()
     
     const validare_solicitare = schema.create(
      {
          nume:schema.string({trim:true},[rules.maxLength(70),rules.minLength(7)]),
          clinica:schema.string({trim:true},[rules.maxLength(70),rules.minLength(7)]),
          cod:schema.string({trim:true},[rules.maxLength(6),rules.minLength(6)]),
          email:schema.string({trim:true},[rules.email()]),
          parola:schema.string({trim:true},[rules.minLength(8),rules.regex(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]),
          idplan:schema.number()
      })

      const solicitare_validata = await request.validate({
        schema:validare_solicitare,
        messages:{
            'nume.required':"Introduceti un nume valid",
            "nume.minLength":"Numele nu poate fi mai mic de 7 caractere!",
            "nume.maxLength":"Numele nu poate depasi 70 de caractere!",
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
    //console.log(clinica_noua,solicitare_validata)
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
}
