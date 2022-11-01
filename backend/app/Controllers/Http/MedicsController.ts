import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Medic from 'App/Models/Medic'
import Drive from '@ioc:Adonis/Core/Drive'

export default class MedicsController {

    public async register({request,response}:HttpContextContract){

        const validare_medic = schema.create(
            {
                nume:schema.string({trim:true}),
                codparafa:schema.string({trim:true}),
                grad:schema.string({trim:true}),
                urlpoza:schema.string.optional(),
                mail:schema.string.optional({trim:true},[rules.email()]),
                competente:schema.string.optional(),
                idspecialitate:schema.number(),
                idclinica:schema.number()
            }
        )
    

    
        try {
            const medic_validat = await request.validate({schema:validare_medic});
    
            const medic = await Medic.create(medic_validat);
        
            return medic;
          } catch (error) {
            response.send({errors:error.messages})
          }
       }

        public async medicioperator({params,request}:HttpContextContract){
          let idclinica  = request.headers().idclinica;
         // console.log(typeof idclinica)
            const medici= await Database
            .from('medics')
            .join('programs', 'programs.idmedic', '=', 'medics.id')
            .join('cabinets','cabinets.id','=','programs.idcabinet')
            .select('medics.id')
            .select('medics.nume')
            .where('cabinets.idoperator',params.id==0?'>':'=',params.id)
            .andWhere({'cabinets.idclinica':idclinica})
            .groupByRaw('cabinets.idoperator,medics.id,medics.nume')
     //   return Medic.all();
            return {medici}

        }

        public async uploadpoza({request,response}: HttpContextContract) {
        
           let {idmedic} = request.body();
           const poza = request.file('pozamedic', {
             size: '1mb',
             extnames: ['jpg', 'png', 'jpeg','bmp'],
           })
         //console.log(poza);
         if(poza){
             
             
             await poza.moveToDisk('./medici/')
             const fileName = poza.fileName;
             let m = await Medic.findOrFail(idmedic)
             let fisiersiglaVechi=m.urlpoza;
             if(fisiersiglaVechi!=='/medici/doctor.png') await Drive.delete('.'+fisiersiglaVechi)
             
            await m
            .merge({urlpoza:'/medici/'+fileName})
            .save()
       
             return response.send({
               message:'Succes',
               numefisier:fileName
             })
           }
         }

       public async index({request}:HttpContextContract){
        let idclinica=request.headers().idclinica;
        const medici= await Database
            .from('medics')
            .join('specialitates', 'medics.idspecialitate', '=', 'specialitates.id')
            .select('medics.*')
            .select('specialitates.denumire')
            .where({'medics.idclinica':idclinica,'medics.stare':'activ','specialitates.stare':'activ'}) 
     //   return Medic.all();
            return {medici}
       }
    
       public async updatemedic({params,request,response}:HttpContextContract){
    
        const medic = await Medic.findOrFail(params.id)
         
        const validare_medic = schema.create(
            {
                nume:schema.string({trim:true}),
                codparafa:schema.string({trim:true}),
                grad:schema.string({trim:true}),
                mail:schema.string.optional({trim:true},[rules.email()]),
                competente:schema.string.optional()

            }
        )
    

        try {
            const medic_validat = await request.validate({schema:validare_medic,messages:{
            
              'email':'Adresa email invalida!'
            }});
      
            return await medic
            .merge(medic_validat)
            .save()
          } catch (error) {
            response.send({errors:error.messages})
          }
    
       }
    
       public async deletemedic({params}:HttpContextContract){
    
        const medic = await Medic.findOrFail(params.id)
         
        await medic
                .merge({stare:'inactiv'})
                .save()
            return `Medicul ${medic.nume} a fost inactivat cu succes!`
       }
}
