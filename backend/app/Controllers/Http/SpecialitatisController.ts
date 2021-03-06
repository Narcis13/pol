import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Specialitate from 'App/Models/Specialitate'
import { schema} from '@ioc:Adonis/Core/Validator'

export default class SpecialitatisController {
    public async index(){
        
        return await Specialitate.all();
    }

    public async store({request}:HttpContextContract){

        const validare_specialitate = schema.create(
            {
                denumire:schema.string({trim:true})
            }
        )
    
        const specialitate_validata = await request.validate({schema:validare_specialitate});
    
        const specialitate = await Specialitate.create(specialitate_validata);
    
        return specialitate;
    
    
       }

       public async updatespecialitate({params,request}:HttpContextContract){

           const specialitate = await Specialitate.findOrFail(params.id)
           
        return await specialitate
            .merge(request.body())
            .save()
    
       }

       public async stergspecialitate({params}:HttpContextContract){

        const spec = await Specialitate.findOrFail(params.id)
         
        await spec
                     .delete()
            return `Specialitate ${spec.denumire} a fost stearsa cu succes!`
       }
}
