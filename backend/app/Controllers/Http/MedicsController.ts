import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Medic from 'App/Models/Medic'

export default class MedicsController {

    public async register({request,response}:HttpContextContract){

        const validare_medic = schema.create(
            {
                nume:schema.string({trim:true}),
                codparafa:schema.string({trim:true},[rules.unique({table:'medics',column:'codparafa'})]),
                grad:schema.string({trim:true}),
                urlpoza:schema.string.optional(),
                mail:schema.string.optional(),
                competente:schema.string.optional(),
                idspecialitate:schema.number()
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

        public async medicioperator({params}:HttpContextContract){

            const medici= await Database
            .from('medics')
            .join('programs', 'programs.idmedic', '=', 'medics.id')
            .join('cabinets','cabinets.id','=','programs.idcabinet')
            .select('medics.id')
            .select('medics.nume')
            .where('cabinets.idoperator',params.id==0?'>':'=',params.id)
            .groupByRaw('cabinets.idoperator,medics.id,medics.nume')
     //   return Medic.all();
            return {medici}

        }

       public async index(){
        const medici= await Database
            .from('medics')
            .join('specialitates', 'medics.idspecialitate', '=', 'specialitates.id')
            .select('medics.*')
            .select('specialitates.denumire')
     //   return Medic.all();
            return {medici}
       }
    
       public async updatemedic({params,request}:HttpContextContract){
    
        const medic = await Medic.findOrFail(params.id)
         
        return await medic
            .merge(request.body())
            .save()
    
       }
    
       public async deletemedic({params}:HttpContextContract){
    
        const medic = await Medic.findOrFail(params.id)
         
        await medic
                     .delete()
            return `Medicul ${medic.nume} a fost sters cu succes!`
       }
}
