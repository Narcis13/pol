import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Serviciu from 'App/Models/Serviciu'
import Program from 'App/Models/Program'

export default class ServiciusController {

    public async store({request}:HttpContextContract){

        const validare_serviciu = schema.create(
            {
                denumire:schema.string({trim:true}/*,[rules.unique({table:'servicius',column:'denumire'})]*/),
                durata:schema.number([rules.range(5,240)]),
                tarif:schema.number.optional(),
                idclinica:schema.number()

            }
        )
    
        const serviciu_validat = await request.validate({schema:validare_serviciu});
    
        const serviciu = await Serviciu.create(serviciu_validat);
    
        return serviciu;
    
    
       }

       public async index({request}:HttpContextContract){
        const idclinica=request.headers().idclinica;
        //console.log('ajung aici', idclinica)
        const servicii = await Serviciu.query()
        .where({'idclinica':idclinica,'stare':'activ'}) 

        return servicii; 
       
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
            .merge({stare:'inactiv'})
            .save()
                   // .delete()
             await Program
                   .query()
                   .where({'idserviciumedical':params.id})   
                   .update({'stare':'inactiv'})              
            return `Serviciul ${serviciu.denumire} a fost inactivat cu succes!`
       }
}
