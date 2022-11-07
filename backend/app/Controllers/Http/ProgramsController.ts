 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Program from 'App/Models/Program';
import Sarbatoare from 'App/Models/Sarbatoare';
import { DateTime } from 'luxon'

export default class ProgramsController {
    public async register({request}:HttpContextContract){

        const validare_program = schema.create(
            {
                orastart:schema.string({trim:true},[rules.minLength(6),rules.maxLength(6)]),
                orastop:schema.string({trim:true},[rules.minLength(6),rules.maxLength(6)]),
                stare:schema.string.optional(),
                idcabinet:schema.number(),
                idclinica:schema.number(),
                idserviciumedical:schema.number(),
                idspecialitate:schema.number(),
                idmedic:schema.number(),
                ziuadinsaptamina:schema.number([rules.range(0,240)])
            }
        )
    
        const program_validat = await request.validate({schema:validare_program});
    
        const program = await Program.create(program_validat);
    
        return program;
    
    
       }
       
       public async sarbatoarenoua({request}:HttpContextContract){
        // console.log(request.body())
        const sarbatoare  = await Sarbatoare.create(request.body())
        
        return sarbatoare;

       }

       public async programcabinet({params}:HttpContextContract){

        // return Program.all();
 
        const program_cabinet= await Database
        .from('programs')
        .join('medics', 'programs.idmedic', '=', 'medics.id')
        .join('cabinets', 'programs.idcabinet', '=', 'cabinets.id')
        .join('servicius', 'programs.idserviciumedical', '=', 'servicius.id')
        .join('specialitates', 'medics.idspecialitate', '=', 'specialitates.id')
        .select('programs.*')
        .select({grad:'medics.grad',numemedic:'medics.nume',cabinet:'cabinets.denumire',serviciu:'servicius.denumire',durata:'servicius.durata',idspecialitate:'medics.idspecialitate',specialitate:'specialitates.denumire'})
        .where('cabinets.id',params.id)
        .orderBy('created_at', 'asc')
 //   return Medic.all();
        return {program_cabinet}
        }

       public async sarbatori({request}:HttpContextContract){
        let idclinica=request.headers().idclinica;
        const sarbatori= await Database
        .from('sarbatoares')
   
        .select('sarbatoares.*')
        .where({'sarbatoares.idclinica':idclinica})
        .orderBy('sarbatoares.luna', 'asc')
        .orderBy('sarbatoares.zi', 'asc')
       
 //   return Medic.all();
        return {sarbatori}
       } 

       public async index({request}:HttpContextContract){

       // return Program.all();
       let idclinica=request.headers().idclinica;
       const program= await Database
       .from('programs')
       .join('medics', 'programs.idmedic', '=', 'medics.id')
       .join('cabinets', 'programs.idcabinet', '=', 'cabinets.id')
       .join('servicius', 'programs.idserviciumedical', '=', 'servicius.id')
       .join('specialitates', 'medics.idspecialitate', '=', 'specialitates.id')
       .select('programs.*')
       .select({numemedic:'medics.nume',cabinet:'cabinets.denumire',serviciu:'servicius.denumire',durata:'servicius.durata',idspecialitate:'medics.idspecialitate',specialitate:'specialitates.denumire'})
       .where({'programs.idclinica':idclinica,'programs.stare':'activ'})
       .orderBy('idcabinet', 'asc')
       .orderBy('ziuadinsaptamina', 'asc')
       .orderBy('orastart', 'asc')
//   return Medic.all();
       return {program}
       }

     public async cabinetespecialitate({params}:HttpContextContract){
        const cabinete= await Database
        .from('programs')
        .join('cabinets', 'programs.idcabinet', '=', 'cabinets.id')

        .select({idcabinet:'programs.idcabinet',cabinet:'cabinets.denumire'})
        .where('programs.idspecialitate',params.id)
        .groupBy('programs.idcabinet')

        let primazi = DateTime.now().plus({days:1}).setLocale('ro-RO')//.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
        let zile : any[]=[]
        let pagina=1;
        zile.push({
            'textlocalizat':primazi.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY).toUpperCase(),
            iso:primazi.toISO(),
            formatata:primazi.toFormat('yyyy-MM-dd'),
            indexzi:primazi.weekday,
            pagina
        }) 

        for(var i=1;i<35;i++){
           if(i%7==0) pagina++ 
           let zi= primazi.plus({days:i})
           zile.push({
            'textlocalizat':zi.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY).toUpperCase(),
            iso:zi.toISO(),
            formatata:zi.toFormat('yyyy-MM-dd'),
            indexzi:zi.weekday,
            pagina
        }) 
        }
 
        return {cabinete,zile}
       }
    
       public async updatesarbatoare({params,request}:HttpContextContract){
    
        const s = await Sarbatoare.findOrFail(params.id)
         
        return await s
            .merge(request.body())
            .save()
    
       }
    
       public async stergesarbatoare({params}:HttpContextContract){

        const sarbatoare = await Sarbatoare.findOrFail(params.id)
         
        await sarbatoare
                     .delete()
            return `Sarbatoarea legala a fost stearsa cu succes!`
       }

       public async deleteprogram({params}:HttpContextContract){
    
        const program = await Program.findOrFail(params.id)
         
        await program
                .merge({stare:'inactiv'})
                .save()
            return `Slotul de program clinica a fost inactivat cu succes!`
       }
}
