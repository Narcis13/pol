import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Medic from 'App/Models/Medic'

export default class MedicsController {

    public async register({request}:HttpContextContract){

        const validare_medic = schema.create(
            {
                nume:schema.string({trim:true}),
                codparafa:schema.string({trim:true},[rules.unique({table:'medics',column:'codparafa'})]),
                grad:schema.string({trim:true}),
                urlpoza:schema.string.optional(),
                mail:schema.string.optional(),
                competente:schema.string.optional()
            }
        )
    
        const medic_validat = await request.validate({schema:validare_medic});
    
        const medic = await Medic.create(medic_validat);
    
        return medic;
    
    
       }

       public async index(){

        return Medic.all();
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
