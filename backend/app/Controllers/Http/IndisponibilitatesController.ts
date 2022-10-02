import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Indisponibilitate from 'App/Models/Indisponibilitate'
import { DateTime } from 'luxon';

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
            .orderBy('indisponibilitates.created_at', 'desc')
     //   return Medic.all();
            return {indis}
       }
    
      public async inditeste(){
          
          const test_data= await Database
          .from('bifa.utilizatori')
          .select('bifa.utilizatori.*')

          return {test_data}
      } 

      public async indisperoperator({params}:HttpContextContract){
        const indis= await Database
          .from('indisponibilitates')
          .join('medics', 'indisponibilitates.idmedic', '=', 'medics.id')
          .join('programs', 'programs.idmedic', '=', 'indisponibilitates.idmedic')
          .join('cabinets','cabinets.id','=','programs.idcabinet')
          .select('indisponibilitates.*')
          .select('medics.nume')
          .where('cabinets.idoperator',params.id==0?'>':'=',params.id)
          .groupByRaw('cabinets.idoperator,indisponibilitates.id,medics.nume')
          .orderBy('indisponibilitates.created_at', 'desc') // daca se devodeste a fi naspa o sa comentez linia asta!!!!
  //   return Medic.all();
        return {indis}


       } 

       public async indisperspecialitate({params}:HttpContextContract){
//console.log(DateTime.now().plus({days:1}).toSQLDate())
        const indis= await Database
        .from('indisponibilitates')
        .join('medics', 'indisponibilitates.idmedic', '=', 'medics.id')
        .select('indisponibilitates.*')
        .where('medics.idspecialitate',params.id)
        .andWhere('indisponibilitates.datastop','>=',DateTime.now().plus({days:1}).toSQLDate())
        .orderBy('created_at', 'desc')

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
