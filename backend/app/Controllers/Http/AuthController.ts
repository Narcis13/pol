import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import user from 'App/Models/user';
import Clinica from 'App/Models/Clinica';
import Env from '@ioc:Adonis/Core/Env';



export default class AuthController {
   public async register({request,response}:HttpContextContract){

    const validare_user = schema.create(
        {
            nume:schema.string({trim:true}),
            numeunic:schema.string({trim:true},[rules.unique({table:'users',column:'numeunic'})]),
            rol:schema.string({trim:true}),
            numeintreg:schema.string({trim:true}),
            password:schema.string({trim:true}),
            email:schema.string.optional({trim:true},[rules.email()]),
            idclinica:schema.number(),
            createdby:schema.number(),
        }
    )

    try {
        const utilizator_validat = await request.validate({schema:validare_user});

        const utilizator = await user.create(utilizator_validat);
    
        return utilizator;
      } catch (error) {
        response.send({errors:error.messages})
      }




   }

   public async index({request}:HttpContextContract){
    let idclinica=request.headers().idclinica;
    const users =  await user.query().
                          where({'rol':'operator','idclinica':idclinica})
    return users//user.all();
   }

   public async alluserscabs({request}:HttpContextContract){
    let idclinica=request.headers().idclinica;
    const users =  await user.query().
                          where({'idclinica':idclinica})
    return users//user.all();
   }

   public async updateuser({params,request,response}:HttpContextContract){
    //console.log(request.body())
    const utilizator = await user.findOrFail(params.id)
    const validare_user = schema.create(
      {
          nume:schema.string({trim:true}),
          numeunic:schema.string.optional({trim:true},[rules.unique({table:'users',column:'numeunic'})]),
          rol:schema.string({trim:true}),
          numeintreg:schema.string({trim:true}),
          password:schema.string.optional({trim:true}),
          email:schema.string.optional({trim:true},[rules.email()])

      }
     )

     try {
      const utilizator_validat = await request.validate({schema:validare_user,messages:{
        'numeunic.unique':'Numele trebuie sa fie unic!',
        'email':'Adresa email invalida!'
      }});

      return await utilizator
      .merge(utilizator_validat)
      .save()
    } catch (error) {
      response.send({errors:error.messages})
    }
   /* return await utilizator
        .merge(request.body())
        .save()*/


   }

   public async deleteuser({params}:HttpContextContract){

    const utilizator = await user.findOrFail(params.id)
     
    await utilizator
                 .delete()
        return `Utilizatorul ${utilizator.numeintreg} a fost sters cu succes!`
   }

   public async login({auth,request}:HttpContextContract){
       const {nume,password,slug} = request.all()
       let mod= Env.get('APP_MOD')
       let mesaj = Env.get('APP_MESAJ')
       mesaj= mesaj.split('_').join(' ')

       if(mod=='OFFLINE') return mesaj;
       try {
          // await auth.attempt(nume,password)
          const clinica = await Clinica.findBy('slug',slug);
          let idclinica = clinica?.id;
          let numeunic=nume+idclinica;
       //   console.log(numeunic,password,slug,idclinica)

           const token = await auth.use('api').attempt(numeunic, password,{
            expiresIn: '960 mins'
          })
           //return token

           const loggeduser = await user.findBy('numeunic',numeunic)// aici trebuie sa ma intreb de stare ......
           if(loggeduser?.stare=="activ")
            return {loggeduser,token,clinica}
           else
             return 'Utilizatorul nu a putut fi autentificat!'
       } catch (error) {
         //  console.log(error)
           return 'Utilizatorul nu a putut fi autentificat!'
       }
   }

   public async logout({ auth }:HttpContextContract){
   
        await auth.use('web').logout()
        return "Logged out!"
   }
}
