import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Indisponibilitate from 'App/Models/Indisponibilitate'

export default class IndisponibilitatesController {

    public async register({request,response}:HttpContextContract){
      // console.log('Register indis ',request.body())
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
    
        try {
            const indi_validat = await request.validate({schema:validare_indi});
    
            const indi = await Indisponibilitate.create(indi_validat);
        
            return indi;
        
          } catch (error) {
            response.send({errors:error.messages})
          }

  
    
       }

       public async index(){
        const indis= await Database
            .from('indisponibilitates')
            .join('medics', 'indisponibilitates.idmedic', '=', 'medics.id')
            .select('indisponibilitates.*')
            .select('medics.nume')
            .orderBy('created_at', 'desc')
     //   return Medic.all();
            return {indis}
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
