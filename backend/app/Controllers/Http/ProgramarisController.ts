import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Solicitare from 'App/Models/Solicitare';
import Specialitate from 'App/Models/Specialitate'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database';
import Programarise from 'App/Models/Programarise';
import { DateTime } from 'luxon'

export default class ProgramarisController {

    public async register({request}:HttpContextContract){

       
    
        
    
        const programare = await Programarise.create(request.body());
    
        return programare;
    
    
       }

    public async programarecabinet({params}:HttpContextContract){
      //  let primazi = DateTime.now().plus({days:1}).setLocale('ro-RO').toFormat('yyyy-MM-dd').toString();
        const programari= await Database
        .from('programarises')
        .select('programarises.*')
        .where({'programarises.stare':'activ','programarises.idcabinet':params.id})
        .andWhere('programarises.data','>=',DateTime.now().plus({days:1}).toSQLDate())
        .orderBy('created_at', 'asc')
 //   return Medic.all();
        programari.map(p=>{
            p.data=DateTime.fromJSDate(new Date(p.data)).toFormat('yyyy-MM-dd')
           // console.log(p.data)
        })
        return {programari}
      // console.log('Programare cabinet',params.id,request.body())
    
        
    }   

    public async formular({view}:HttpContextContract){
        const specialitati = await Specialitate.all();
    //console.log(specialitati)
        return view.render('solicitareprogramare',{specialitati})
    }

    public async osolicitare({params}:HttpContextContract){
      
        const solicitare = await Solicitare.findBy('hash',params.token) 
        const solicitare_q = await Database
            .from('solicitares')
            .join('specialitates', 'solicitares.idspecialitate', '=', 'specialitates.id')
            .select('solicitares.*')
            .select('specialitates.denumire')
            .where('solicitares.hash',params.token)
            
             return {solicitare,solicitare_q};
    }

    public async solicitare({request,response,session}:HttpContextContract){
        //console.log('solicitare',request.body())
        const validare_solicitare = schema.create(
            {
                nume:schema.string({trim:true},[rules.maxLength(70),rules.minLength(7)]),
                telefon:schema.string({trim:true},[rules.mobile(),rules.maxLength(10),rules.minLength(10)]),
                email:schema.string({trim:true},[rules.email()]),
                idspecialitate:schema.number(),
                mesaj:schema.string.optional({trim:true},[rules.maxLength(255)]),
                //acord:schema.string()
            }
        )

       if(request.input('acord')=="on"){
        const solicitare_validata = await request.validate({
            schema:validare_solicitare,
            messages:{
                'nume.required':"Introduceti un nume valid",
                "nume.minLength":"Numele nu poate fi mai mic de 7 caractere!",
                "nume.maxLength":"Numele nu poate depasi 70 de caractere!",
                "telefon.required":"Numar de telefon obligatoriu",
                "telefon.mobile":"Numar de telefon mobil invalid",
                "telefon.minLength":"Numar de telefon mobil invalid",
                "telefon.maxLength":"Numar de telefon mobil invalid",
                "email.required":"Adresa de email este obligatorie",
                "email.email":"Adresa de e-mail invalida",
                "mesaj.maxLength":"Mesajul trebuie sa fie scurt (pina in 255 de caractere)",
            }
        });
       const solicitare = await Solicitare.create(solicitare_validata);
       const hash:string=solicitare.hash;

      await Mail.sendLater((message) => {
        message
          .from('programari@smupitesti.org')
          .to(request.input('email'))
          .subject('Programare online Spitalul Militar de Urgenta Dr. Ion Jianu Pitesti')
          .htmlView('emails/programator', { nume: request.input('nume'),hash })
      })

        session.flash('notificare','Va multumim si va invitam sa va consultati casuta de e-mail in care veti primi linkul catre sectiunea aferenta solicitarii dumneavoastra!')
       }
       else
       {
        session.flash('lipsaacord','Trebuie sa fiti de acord cu termenii si conditiile si sa va dati acordul pentru prelucrarea datelor cu caracter personal pentru a continua')
       }

            return response.redirect().back()
         
           
         

  
   
      
      

    }
}
