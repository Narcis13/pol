import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Serviciu from 'App/Models/Serviciu'

export default class ServiciusController {

    public async store({request}:HttpContextContract){

        const validare_serviciu = schema.create(
            {
                denumire:schema.string({trim:true},[rules.unique({table:'servicius',column:'denumire'})]),
                durata:schema.number([rules.range(5,240)])

            }
        )
    
        const serviciu_validat = await request.validate({schema:validare_serviciu});
    
        const serviciu = await Serviciu.create(serviciu_validat);
    
        return serviciu;
    
    
       }

       public async index(){

        return Serviciu.all();
       }
    
       public async updateserviciu({params,request}:HttpContextContract){
    
        const serviciu = await Serviciu.findOrFail(params.id)
         
        return await serviciu
            .merge(request.body())
            .save()
    
       }

       public async deleteserviciu({params}:HttpContextContract){

        const serviciu = await Serviciu.findOrFail(params.id)
         
        await serviciu
                     .delete()
            return `Serviciul ${serviciu.denumire} a fost sters cu succes!`
       }
}
