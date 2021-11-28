import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Solicitare from 'App/Models/Solicitare';
import Specialitate from 'App/Models/Specialitate'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ProgramarisController {

    public async formular({view}:HttpContextContract){
        const specialitati = await Specialitate.all();
    //console.log(specialitati)
        return view.render('solicitareprogramare',{specialitati})
    }

    public async solicitare({request,response,session,view}:HttpContextContract){
        //console.log('solicitare',request.body())
        const validare_solicitare = schema.create(
            {
                nume:schema.string({trim:true},[rules.maxLength(70),rules.minLength(7)]),
                telefon:schema.string({trim:true},[rules.mobile()]),
                email:schema.string({trim:true},[rules.email()]),
                idspecialitate:schema.number(),
                mesaj:schema.string({trim:true},[rules.maxLength(255)]),
              //  acord:schema.string()
            }
        )

       
            const solicitare_validata = await request.validate({
                schema:validare_solicitare,
                messages:{
                    'nume.required':"Introduceti un nume valid",
                    "nume.minLength":"Numele nu poate fi mai mic de 7 caractere!",
                    "nume.maxLength":"Numele nu poate depasi 70 de caractere!",
                    "telefon.required":"Numar de telefon obligatoriu",
                    "telefon.mobile":"Numar de telefon mobil invalid"
                }
            });
           const solicitare = await Solicitare.create(solicitare_validata);
           const hash:string=solicitare.hash;

          await Mail.send((message) => {
            message
              .from('programari@smupitesti.org')
              .to(request.input('email'))
              .subject('Programare online Spitalul Militar de Urgenta Dr. Ion Jianu Pitesti')
              .htmlView('emails/programator', { nume: request.input('nume'),hash })
          })

            session.flash('notificare','Va multumim si va invitam sa va consulati casuta de e-mail in care veti primi linkul catre sectiunea aferenta solicitarii dumneavoastra!')
            return response.redirect().back()
         
           
         

  
   
      
      

    }
}
