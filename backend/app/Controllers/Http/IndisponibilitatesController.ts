import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Indisponibilitate from 'App/Models/Indisponibilitate'

export default class IndisponibilitatesController {

    public async register({request}:HttpContextContract){

        const validare_indi = schema.create(
            {

                tipindisponibilitate:schema.string({trim:true}),
                idmedic:schema.number(),
                datastart:schema.date({}, [
                    rules.after('today')
                  ]),
                datastop:schema.date({}, [
                    rules.after('today')
                  ])

            }
        )
    
        const indi_validat = await request.validate({schema:validare_indi});
    
        const indi = await Indisponibilitate.create(indi_validat);
    
        return indi;
    
    
       }

       public async index(){

        return Indisponibilitate.all();
       }
    
       public async updatemedic({params,request}:HttpContextContract){
    
        const indi = await Indisponibilitate.findOrFail(params.id)
         
        return await indi
            .merge(request.body())
            .save()
    
       }
    
       public async deletemedic({params}:HttpContextContract){
    
        const indi = await Indisponibilitate.findOrFail(params.id)
         
        await indi
                     .delete()
            return `Indisponibilitate medic adaugata cu succes!`
       }
}
