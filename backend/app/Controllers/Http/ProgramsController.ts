 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Program from 'App/Models/Program';

export default class ProgramsController {
    public async register({request}:HttpContextContract){

        const validare_program = schema.create(
            {
                orastart:schema.string({trim:true},[rules.minLength(6),rules.maxLength(6)]),
                orastop:schema.string({trim:true},[rules.minLength(6),rules.maxLength(6)]),
                stare:schema.string.optional(),
                idcabinet:schema.number(),
                idserviciumedical:schema.number(),
                idmedic:schema.number(),
                ziuadinsaptamina:schema.number([rules.range(0,240)])
            }
        )
    
        const program_validat = await request.validate({schema:validare_program});
    
        const program = await Program.create(program_validat);
    
        return program;
    
    
       }

       public async index(){

       // return Program.all();

       const program= await Database
       .from('programs')
       .join('medics', 'programs.idmedic', '=', 'medics.id')
       .join('cabinets', 'programs.idcabinet', '=', 'cabinets.id')
       .join('servicius', 'programs.idserviciumedical', '=', 'servicius.id')
       .join('specialitates', 'medics.idspecialitate', '=', 'specialitates.id')
       .select('programs.*')
       .select({numemedic:'medics.nume',cabinet:'cabinets.denumire',serviciu:'servicius.denumire',durata:'servicius.durata',idspecialitate:'medics.idspecialitate',specialitate:'specialitates.denumire'})
       .orderBy('created_at', 'asc')
//   return Medic.all();
       return {program}
       }
    
       public async updateprogram({params,request}:HttpContextContract){
    
        const program = await Program.findOrFail(params.id)
         
        return await program
            .merge(request.body())
            .save()
    
       }
    
       public async deleteprogram({params}:HttpContextContract){
    
        const program = await Program.findOrFail(params.id)
         
        await program
                     .delete()
            return `Slotul de program clinica a fost sters cu succes!`
       }
}
