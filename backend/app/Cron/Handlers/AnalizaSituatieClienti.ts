import Clinica from '../../Models/Clinica'
import { DateTime } from 'luxon'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class SituatieClienti {
// ! To DO - sa fac ceva in ultima luna de abonament .....sa transform in trial!

    public run(){
        return new Promise(
            async (reject)=>{
                try {
                   const clinici = await Clinica.all();
                   const NOW = DateTime.now()
                   clinici.map(c=>{
                    if(c.stare=='trial'&&c.stoptrial){
                        let dif=c.stoptrial.diff(NOW, 'days').toObject().days
                        if(dif) dif=Math.floor(dif)
                        console.log('Execut analiza clienti',dif,dif==10,c.denumire)
                        if(dif==10){
                            Mail.send((message) => {
                                message
                                  .from('noreply@eleventen.ro')
                                  .to(c.email)
                                  .subject('Factura proforma abonament platforma elEvenTen - programari online si offline')
                                  .htmlView('emails/remindertrial')
                              })
                        }

                    }
                      
                   })
                   

                }
                catch (error) {
                    reject(error)
                  }
            }
        )
    }
}

/* model
export default class SituatieClienti {


    public run(){
        return new Promise(
            async (reject)=>{
                try {

                }
                catch (error) {
                    reject(error)
                  }
            }
        )
    }
}


*/