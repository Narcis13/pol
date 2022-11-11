import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import Solicitare from 'App/Models/Solicitare';
import Clinica from 'App/Models/Clinica';
import Specialitate from 'App/Models/Specialitate'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database';
import Programarise from 'App/Models/Programarise';
import { DateTime } from 'luxon'
import Medic from 'App/Models/Medic';

export default class ProgramarisController {

    public async register({request}:HttpContextContract){

       // tb sa  mai verific sa nu fie patratica ocupata
       const programari= await Database
       .from('programarises')
       .select('programarises.*')
       .where({'programarises.stare':'activ','programarises.idprogram':request.body().idprogram,'programarises.indexslot':request.body().indexslot})
       .andWhere('programarises.data','=',request.body().data)
       .orderBy('created_at', 'asc')
      if (programari.length==0){
        let idsolicitare=request.body().idsolicitare;
        const solicitare = await Solicitare.findOrFail(idsolicitare) 
      //  console.log(solicitare.email)
        let email=solicitare.email
        let nume = solicitare.nume
        await solicitare.merge({confirmat:true}).save()
        const programare = await Programarise.create(request.body());
        const medic = await Medic.findOrFail(request.body().idmedic) 
        await Mail.sendLater((message) => {
            message
              .from('programari@smupitesti.org')
              .to(email)
              .subject('Confirmare programare online Spitalul Militar de Urgenta Dr. Ion Jianu Pitesti')
              .htmlView('emails/confirmare', { medic:medic.nume,grad:medic.grad,nume,token:programare.token+'-'+programare.id,orastart:programare.orastart,data:DateTime.fromJSDate(new Date(programare.data)).toFormat('dd.MM.yyyy') })
          })

        return programare;
       
      }
      else
      return {data:false}
        
    
       }

       public async anulare({params}:HttpContextContract){
        let elemente=params.token.split('-')
        const programare = await Programarise.findOrFail(elemente[1]) 
        if (programare&& programare.token==elemente[0]){
            programare.stare='anulata'
            await programare.save()
                 return "Programare anulata cu succes!";
        }
        return 'Eroare';

    }
    
        public async anulareprogramare({request}:HttpContextContract){
           // console.log(request.body())
           const programare = await Programarise.findOrFail(request.body().id)
           if (programare){
               programare.stare='anulata'
               await programare.save()
           }

           await Mail.sendLater((message) => {
            message
              .from('programari@smupitesti.org')
              .to(request.body().email)
              .subject('Anulare programare online Spitalul Militar de Urgenta Dr. Ion Jianu Pitesti')
              .htmlView('emails/anulare', { mesaj: request.body().mesaj })
          })

            return {mesaj:'Programare anulata cu succes!'}

        }

    public async programarecabinet({params,request}:HttpContextContract){

        let idclinica=request.headers().idclinica;
      //  let primazi = DateTime.now().plus({days:1}).setLocale('ro-RO').toFormat('yyyy-MM-dd').toString();
        const programari= await Database
        .from('programarises')
        .select('programarises.*')
        .where({'programarises.stare':'activ','programarises.idcabinet':params.id,'programarises.idclinica':idclinica})
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

    public async programaremedic({request}:HttpContextContract){
       // console.log(request.qs())
      const programari= await Database
          .from('programarises')
          .select('programarises.*')
          .where({'programarises.stare':'activ','programarises.idmedic':request.qs().idmedic})
          .andWhere('programarises.data','>=',request.qs().datastart)
          .andWhere('programarises.data','<=',request.qs().datastop)
  
  
          programari.map(p=>{
              p.data=DateTime.fromJSDate(new Date(p.data)).toFormat('yyyy-MM-dd')
          
          })
          return {programari}
        
     
          
      } 

    public async formular({params,view}:HttpContextContract){
        const clinica = await Clinica.findBy('slug',params.slug);
        if(clinica){
           // console.log(params.slug,clinica.id,clinica.denumire);
            const specialitati = await Specialitate.query().where('specialitates.idclinica',clinica.id);
           
            return view.render('solicitareprogramare',{specialitati,clinica})
        }

    }

    public async programaricabinet({params}:HttpContextContract){
        const programari= await Database
        .from('programarises')
   
        .join('solicitares', 'programarises.idsolicitare', '=', 'solicitares.id')
        .join('medics', 'programarises.idmedic', '=', 'medics.id')
        .select('programarises.*')
        .select({medic:'medics.nume',nume:'solicitares.nume',telefon:'solicitares.telefon',email:'solicitares.email',specialitateid:'solicitares.idspecialitate'})
        .where({'programarises.stare':'activ','programarises.idcabinet':params.id})
        .andWhere('programarises.data','>=',DateTime.now()./*plus({days:1}).*/toSQLDate())
        .orderBy('programarises.data', 'asc')
        .orderBy('programarises.orastart', 'asc')
        programari.map(p=>{
            p.data=DateTime.fromJSDate(new Date(p.data)).toFormat('yyyy-MM-dd')
        
        })
        return {programari}
    }

    public async raportprogramari({view,request}:HttpContextContract){
        const programari= await Database
        .from('programarises')
        .join('cabinets', 'programarises.idcabinet', '=', 'cabinets.id')
        .join('solicitares', 'programarises.idsolicitare', '=', 'solicitares.id')
        .join('medics', 'programarises.idmedic', '=', 'medics.id')
        .select('programarises.*')
        .select({d:'programarises.data',medic:'medics.nume',idoperator:'cabinets.idoperator',nume:'solicitares.nume',telefon:'solicitares.telefon',cabinet:'cabinets.denumire'})
        .where({'programarises.stare':'activ'})//,'programarises.data':request.qs().d})
        .andWhere('programarises.data','>=',request.qs().d)
        .andWhere('programarises.data','<=',request.qs().stop)
        .andWhere('cabinets.idoperator',request.qs().userid==0?'>':'=',request.qs().userid)
        .orderBy('programarises.data', 'asc')
        .orderBy('cabinets.denumire', 'asc')

        .orderBy('programarises.orastart', 'asc')

        //console.log(programari)
        programari.map(p=>{
            p.d=DateTime.fromJSDate(new Date(p.d)).toFormat('dd.MM.yyyy')
        
        })
        return view.render('raportprogramari',{data:request.qs().d,userid:request.qs().userid,datastop:request.qs().stop,programari})
    }

    public async osolicitare({params}:HttpContextContract){
      
       // const solicitare = await Solicitare.findBy('hash',params.token) 
        const solicitare_q = await Database
            .from('solicitares')
            .join('specialitates', 'solicitares.idspecialitate', '=', 'specialitates.id')
            .join('clinicas','solicitares.idclinica','=','clinicas.id')
            .select('solicitares.*')
            .select('specialitates.denumire')
            .select({numeclinica:'clinicas.denumire',calesiglaclinica:'clinicas.fisiersigla',emailclinica:'clinicas.email'})
            .where('solicitares.id',params.token)
            
             return {solicitare_q};
    }
    
    public async stergsolicitare({params}:HttpContextContract){
         //console.log(params.token)   
         const s = await Solicitare.findOrFail(params.token)
         
         await s
                      .delete()
             return `Solicitarea a fost stearsa cu succes!`
    }

    public async oprogramare({params}:HttpContextContract){
          const pro = await Database
                   .from('programarises')
                   .join('medics','programarises.idmedic','=','medics.id')
                   .join('cabinets','programarises.idcabinet','=','cabinets.id')
                   .select('programarises.*')
                   .select({medic:'medics.nume',cabinet:'cabinets.denumire'})
                   .where({'programarises.idsolicitare':params.id})

            return pro;       
    }

    public async solicitari({request,params}:HttpContextContract){

        function getMonday(d) {
            d = new Date(d);
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
            return new Date(d.setDate(diff));
          }
          let c=params.cod
          let dataminima=new Date()

              if (c==1){
                dataminima=new Date(new Date().getFullYear(), 0, 1);
                dataminima.setHours(0,0,0,0)
              }
              if (c==2){
                dataminima=new Date();
                dataminima.setHours(0,0,0,0)
              }
              if (c==3){
                dataminima=getMonday(new Date()); // Mon Nov 08 2010
                dataminima.setHours(0,0,0,0)
              }
              if (c==4){
                var d = new Date();
                dataminima=new Date(d.getFullYear(), d.getMonth(), 1);
                dataminima.setHours(0,0,0,0)
              }

             // console.log('Headere solicitari',request.headers().idclinica)
              let idclinica=request.headers().idclinica;
              let idoperator:number = parseInt(request.headers().idoperator?.toString());
        //console.log('Solicitari....',dataminima)
        const solicitari= await Database
            .from('solicitares')
            .join('specialitates', 'solicitares.idspecialitate', '=', 'specialitates.id')
            .join('programs', 'programs.idspecialitate', '=', 'solicitares.idspecialitate')
            .join('cabinets','cabinets.id','=','programs.idcabinet')
            .select('solicitares.*')
            .select('specialitates.denumire')
            .where('solicitares.created_at','>=',dataminima)
            .andWhere('cabinets.idoperator',idoperator==0?'>':'=',idoperator)
            .andWhere({'solicitares.idclinica':idclinica})
            .groupByRaw('solicitares.id')
            .orderBy('solicitares.id','desc')
     //   return Medic.all();
         //   console.log(solicitari)

         solicitari.map(s=>{
            s.created_at=DateTime.fromJSDate(new Date(s.created_at)).toFormat('dd.MM.yyyy')
           // console.log(p.data)
        })
            return {solicitari}
       }

    public async solicitarereprogramare({request}:HttpContextContract){
       // console.log('solicitare',request.body())

       const solicitare = await Solicitare.create(request.body())
        return solicitare;
    }  

    public async solicitare({request,response,session,view}:HttpContextContract){

        const validare_solicitare = schema.create(
            {
                nume:schema.string({trim:true},[rules.maxLength(70),rules.minLength(7)]),
                telefon:schema.string({trim:true},[rules.mobile(),rules.maxLength(10),rules.minLength(10)]),
                email:schema.string({trim:true},[rules.email()]),
                idspecialitate:schema.number(),
                mesaj:schema.string.optional({trim:true},[rules.maxLength(255)]),
                idclinica:schema.number()
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
       const id:number = solicitare.id;

      await Mail.sendLater((message) => {
        message
          .from('programari@smupitesti.org')
          .to(request.input('email'))
          .subject('Programare online Spitalul Militar de Urgenta Dr. Ion Jianu Pitesti')
          .htmlView('emails/programator', { nume: request.input('nume'),hash,id })
      })
       // response.redirect().toRoute('ProgramarisController.successolicitare')
       return view.render('welcome')
       // session.flash('notificare','Va multumim si va invitam sa va consultati casuta de e-mail(inclusiv in Spam) in care veti primi linkul catre sectiunea aferenta solicitarii dumneavoastra!')

    }
       else
       {
        session.flash('lipsaacord','Trebuie sa fiti de acord cu termenii si conditiile si sa va dati acordul pentru prelucrarea datelor cu caracter personal pentru a continua')
       }

            return response.redirect().back()
         
           
         

  
   
      
      

    }

    public async successolicitare({view}:HttpContextContract){
       
    //console.log(specialitati)
        return view.render('welcome')
    }
}
