 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
 import Cabinet from 'App/Models/Cabinet';
 
export default class CabinetsController {

    public async register({request}:HttpContextContract){

        const validare_cabinet = schema.create(
            {
                denumire:schema.string({trim:true},[rules.unique({table:'cabinets',column:'denumire'})]),
                dotare:schema.string.optional({trim:true,escape:true}),
                servicii:schema.string.optional({trim:true,escape:true}),
                orar:schema.string.optional({trim:true,escape:true}),
                idoperator:schema.number()
            }
        )
    
        const cabinet_validat = await request.validate({schema:validare_cabinet});
    
        const cabinet = await Cabinet.create(cabinet_validat);
    
        return cabinet;
    
    
       }

       public async index(){

        const cabinete= await Database
        .from('cabinets')
        .join('users', 'cabinets.idoperator', '=', 'users.id')
        .select('cabinets.*')
        .select('users.nume')
 //   return Medic.all();
        return {cabinete}
       }
    
       public async updatecabinet({params,request}:HttpContextContract){
    
        const cabinet = await Cabinet.findOrFail(params.id)
         
        return await cabinet
            .merge(request.body())
            .save()
    
       }
    
       public async deletecabinet({params}:HttpContextContract){
    
        const cabinet = await Cabinet.findOrFail(params.id)
         
        await cabinet
                     .delete()
            return `Cabinetul ${cabinet.denumire} a fost sters cu succes!`
       }

}
