import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import user from 'App/Models/user';
import Clinica from 'App/Models/Clinica';




export default class AuthController {
   public async register({request,response}:HttpContextContract){

    const validare_user = schema.create(
        {
            nume:schema.string({trim:true},[rules.unique({table:'users',column:'nume'})]),
            rol:schema.string({trim:true}),
            numeintreg:schema.string({trim:true}),
            password:schema.string({trim:true}),
            email:schema.string.optional({trim:true},[rules.email()]),
            idclinica:schema.number()
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

   public async index(){

    return user.all();
   }

   public async updateuser({params,request}:HttpContextContract){

    const utilizator = await user.findOrFail(params.id)
     
    return await utilizator
        .merge(request.body())
        .save()

   }

   public async deleteuser({params}:HttpContextContract){

    const utilizator = await user.findOrFail(params.id)
     
    await utilizator
                 .delete()
        return `Utilizatorul ${utilizator.numeintreg} a fost sters cu succes!`
   }

   public async login({auth,request}:HttpContextContract){
       const {nume,password} = request.all()

       try {
          // await auth.attempt(nume,password)
         // console.log(nume,password)
           const token = await auth.use('api').attempt(nume, password,{
            expiresIn: '30 mins'
          })
           //return token
           const loggeduser = await user.findBy('nume',nume)
           const clinica = await Clinica.findOrFail(loggeduser?.idclinica);
          // if (loggeduser) loggeduser.token=token;
           return {loggeduser,token,clinica}
       } catch (error) {
           console.log(error)
           return 'Utilizatorul nu a putut fi autentificat!'
       }
   }

   public async logout({ auth }:HttpContextContract){
   
        await auth.use('web').logout()
        return "Logged out!"
   }
}
