import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Clinica from 'App/Models/Clinica';

export default class ClinicasController {
  public async index({}: HttpContextContract) {}

  public async uploadsigla({request,response}: HttpContextContract) {
   // console.log('Incercare upload',request.allFiles())
    const sigla = request.file('sigla', {
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg','bmp'],
    })

    if(sigla){
      
       // console.log('Upload ok',fileName)
      await sigla.moveToDisk('./sigle/')
      const fileName = sigla.fileName;
  
     // !!!!!!! actualizare baza de date Get the name of the saved file; to store it in your database, for example.
     /*await Clinica
     .merge({fisiersigla:'/sigle/'+fileName})
     .save()*/

      return response.send({
        message:'Succes',
        numefisier:fileName
      })
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
