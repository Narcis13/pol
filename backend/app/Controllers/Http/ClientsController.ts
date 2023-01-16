import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validareemail from 'App/Models/Validareemail'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ClientsController {

public async validare_email({request}: HttpContextContract){
    let {email} =request.body();
    const random = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    let d = {cod:random.toString(),email}
    await Validareemail.create(d);
    //console.log('Validare email!',validare)

    await Mail.send((message) => {
        message
          .from('programari@eleventen.ro')
          .to(email)
          .subject('Cod verificare email')
          .htmlView('emails/validareemail', { cod:random.toString() })
      })

    return 'Validare email!'
}
}
