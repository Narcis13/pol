 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
 import Cabinet from 'App/Models/Cabinet';
 import Program from 'App/Models/Program'
 import Drive from '@ioc:Adonis/Core/Drive'
 
export default class CabinetsController {

    public async register({request,response}:HttpContextContract){

        const validare_cabinet = schema.create(
            {
                denumire:schema.string({trim:true}),
                dotare:schema.string.optional({trim:true}),
                servicii:schema.string.optional({trim:true}),
                orar:schema.string.optional({trim:true}),
                idoperator:schema.number(),
                idclinica:schema.number(),
                urlpoza:schema.string.optional({trim:true})
            }
        )
        try {
            const cabinet_validat = await request.validate({schema:validare_cabinet,messages:{required: '{{ field }} este obligatoriu!'}});
    
            const cabinet = await Cabinet.create(cabinet_validat);
        
            return cabinet;
        }catch (error) {
            response.send({errors:error.messages})
          }

    
    
       }

       public async index({request}:HttpContextContract){
      // console.log(request)
        let idclinica=request.headers().idclinica;
        const cabinete= await Database
        .from('cabinets')
        .join('users', 'cabinets.idoperator', '=', 'users.id')
        .select('cabinets.*')
        .select('users.nume')
        .where({'cabinets.idclinica':idclinica,'cabinets.stare':'activ','users.stare':'activ'}) 
 //   return Medic.all();
        return {cabinete}
       }
    
       public async updatecabinet({params,request}:HttpContextContract){
    
        const cabinet = await Cabinet.findOrFail(params.id)
         
        return await cabinet
            .merge(request.body())
            .save()
    
       }

       public async uploadpoza({request,response}: HttpContextContract) {
        
        let {idcabinet} = request.body();
        const poza = request.file('pozacabinet', {
          size: '1mb',
          extnames: ['jpg', 'png', 'jpeg','bmp'],
        })
      //console.log(poza);
      if(poza){
          
          
          await poza.moveToDisk('./cabs/')
          const fileName = poza.fileName;
          let m = await Cabinet.findOrFail(idcabinet)
          let fisiersiglaVechi=m.urlpoza;
          if(fisiersiglaVechi!=='/cabs/cabinet.png') await Drive.delete('.'+fisiersiglaVechi)
          
         await m
         .merge({urlpoza:'/cabs/'+fileName})
         .save()
    
          return response.send({
            message:'Succes',
            numefisier:fileName
          })
        }
      }

       public async deletecabinet({params}:HttpContextContract){
    
        const cabinet = await Cabinet.findOrFail(params.id)
         
        await cabinet
        .merge({stare:'inactiv'})
        .save()
               // .delete()
        await Program
               .query()
               .where({'idcabinet':params.id})   
               .update({'stare':'inactiv'}) 

        return `${cabinet.denumire} a fost inactivat cu succes!`
       }

}
