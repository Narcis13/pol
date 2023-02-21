import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Clinica from 'App/Models/Clinica';
import Database from '@ioc:Adonis/Lucid/Database';
import Satisfactia from 'App/Models/Satisfactia';
import {rules , schema} from '@ioc:Adonis/Core/Validator'
const axios = require('axios');

export default class ClinicasController {
  public async index({}: HttpContextContract) {
   // console.log('toate clinicile')
   const clinici= await Database
   .from('clinicas')
   //.join('medics', 'indisponibilitates.idmedic', '=', 'medics.id')
   .select('clinicas.*')
   //.select('medics.nume')
   //.orderBy('indisponibilitates.created_at', 'desc')
//   return Medic.all();
   return {clinici}
  }

  public async oclinica({params}: HttpContextContract) {
      //console.log(params.id)
      let c = await Clinica.findOrFail(params.id)
      //console.log(c)
      return c;

  }
   
  public async trimitsmsanulare({request}:HttpContextContract){
     console.log(request.body())
     let datesms=request.body();
     const smskey=datesms.apikey;
     var options = {
      method: 'POST',
      url: `https://app.smso.ro/api/v1/send?to=%204${datesms.telefon}&sender=4&body=${datesms.mesaj}`,
      headers: {
        Accept: '*/*',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
        'X-Authorization': smskey
      }
    };
      try {
          await axios.request(options)
          return {
            mesaj:'SMS Anulare expediat!'
          }

        } catch (error) {
          //console.log(error.response.body);
        }

  }

  public async creditsms({request}:HttpContextContract){
    
     const smskey=request.headers().smskey
    
   
    var options = {
      method: 'GET',
      url: 'https://app.smso.ro/api/v1/credit-check',
      headers: {
        Accept: '*/*',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
        'X-Authorization': smskey
      }
    };
      try {
          const r= await axios.request(options)
          return r.data;

        } catch (error) {
          //console.log(error.response.body);
        }
  }

  public async updateclinica({request,params,response}:HttpContextContract){

    const clinica = await Clinica.findOrFail(params.id)

    const validare_clinica = schema.create(
      {
        adresa: schema.string({trim:true}),
        denumire: schema.string({trim:true}),
        email:  schema.string.optional({trim:true},[rules.email()]),
        emailconducere1: schema.string.optional({trim:true},[rules.email()]),
        emailconducere2: schema.string.optional({trim:true},[rules.email()]),
        emailconducere3: schema.string.optional({trim:true},[rules.email()]),
        emailpr: schema.string.optional({trim:true},[rules.email()]),
        facebook: schema.string.optional({trim:true}),
        instagram: schema.string.optional({trim:true}),
        companie: schema.string.optional({trim:true}),
        smsapikey: schema.string.optional({trim:true}),
        CUI: schema.string.optional({trim:true}), //validare suplimentara
        adresacompanie: schema.string.optional({trim:true}),
        numeconducere1:schema.string.optional({trim:true}),
        numeconducere2: schema.string.optional({trim:true}),
        numeconducere3: schema.string.optional({trim:true}),
        numepr: schema.string.optional({trim:true}),
        telconducere1: schema.string.optional({trim:true},[rules.mobile(),rules.maxLength(10),rules.minLength(10)]),
        telconducere2: schema.string.optional({trim:true},[rules.mobile(),rules.maxLength(10),rules.minLength(10)]),
        telconducere3: schema.string.optional({trim:true},[rules.mobile(),rules.maxLength(10),rules.minLength(10)]),
        telpr: schema.string.optional({trim:true},[rules.mobile(),rules.maxLength(10),rules.minLength(10)]),
        website: schema.string.optional({trim:true})

      }
  )
  try {
    const clinca_valida = await request.validate({schema:validare_clinica,messages:{
    
      'email':'Adresa email invalida!',
      'mobile':'Numar de telefon invalid!'
    }});

    return await clinica
    .merge(clinca_valida)
    .save()
  } catch (error) {
    response.send({errors:error.messages})
  }


  }

  public async formularInregistrare({view,request}:HttpContextContract){
    //console.log(request.qs())
    const q = request.qs();
    if(q.plan){
      return view.render('inregistrare',{idplan:q.plan})
    }
    else
    {
      return view.render('bunvenit',{succes:false,mesaj:'Nu ati ales un plan de abonament pentru serviciul nostru'})
    }
    
  }

  public async uploadsigla({request,response}: HttpContextContract) {
   // console.log('Incercare upload',request.body())
    let {idclinica} = request.body();
    const sigla = request.file('sigla', {
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg','bmp'],
    })

    if(sigla){
      
       // console.log('Upload ok',fileName)
      await sigla.moveToDisk('./sigle/')
      const fileName = sigla.fileName;
      let c = await Clinica.findOrFail(idclinica)
      let fisiersiglaVechi=c.fisiersigla;
      await Drive.delete('.'+fisiersiglaVechi)
     // !!!!!!! actualizare baza de date Get the name of the saved file; to store it in your database, for example.
     await c
     .merge({fisiersigla:'/sigle/'+fileName})
     .save()

      return response.send({
        message:'Succes',
        numefisier:fileName
      })
    }
  }
  public async prelucraresatisfactie({request,view}:HttpContextContract){
   //console.log('Prelucrare satisfactie',request.body())
   let r=request.body();
   delete r._csrf
    let s = await Satisfactia.create(r)
   //console.log(s.id)

   return view.render('multumirisatisfactie',{id:s.id})
  }

  public async formularsatisfactie({params,view}:HttpContextContract){
    const clinica = await Clinica.findBy('slug',params.slug);
    if(clinica){
       // console.log(params.slug,clinica.id,clinica.denumire);
       // const specialitati = await Specialitate.query().where('specialitates.idclinica',clinica.id);
       
        return view.render('formularsatisfactie',{clinica})
    }

}

}
