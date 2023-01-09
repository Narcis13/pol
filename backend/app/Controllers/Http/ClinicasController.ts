import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Clinica from 'App/Models/Clinica';
import Satisfactia from 'App/Models/Satisfactia';
import {rules , schema} from '@ioc:Adonis/Core/Validator'

export default class ClinicasController {
  public async index({}: HttpContextContract) {}

  public async oclinica({params}: HttpContextContract) {
      //console.log(params.id)
      let c = await Clinica.findOrFail(params.id)
      //console.log(c)
      return c;

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

  public async formularInregistrare({view}:HttpContextContract){
    return view.render('inregistrare')
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
  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
