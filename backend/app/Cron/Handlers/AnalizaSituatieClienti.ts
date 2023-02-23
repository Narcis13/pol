import Factura from '../../Models/Factura'
import { DateTime } from 'luxon'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database';
import View from '@ioc:Adonis/Core/View'
const puppeteer = require('puppeteer');

export default class SituatieClienti {
// ! To DO - sa fac ceva in ultima luna de abonament .....sa transform in trial!

    public run(){
        return new Promise(
            async (reject)=>{
                try {
                 // const clinici = await Clinica.all();
                   const clinicile = await Database
                                           .from('clinicas')  
                                           .join('plans','clinicas.idplan','=','plans.id')
                                           .select('clinicas.*')
                                           .select({numeplan:'plans.denumire',tarif:'plans.tariflunar'})
                   const NOW = DateTime.now()
               //   console.log(clinicile.length)
                   clinicile.map(async c=>{
                    
                    if(c.stare=='trial'&&c.stoptrial){
                       // console.log('Clinica ',c.denumire,c.stare,c.stoptrial)
                        const stoptrial:DateTime = DateTime.fromJSDate(new Date(c.stoptrial))   
                       // console.log('Clinica ',c.denumire,stoptrial.diff(NOW, 'days').toObject().days)   
                     
                        let dif=stoptrial.diff(NOW, 'days').toObject().days
                      
                       if(dif) dif=Math.floor(dif)
                       // console.log('Execut analiza clienti',dif,dif==10,c.denumire,c.tarif)
                        if(dif==10){

                            const proforma = {
                             data:NOW.toSQLDate(),
                             tip:'proforma',
                             nrfact:c.slug,
                             numeclient:c.companie,
                             cuiclient:c.CUI,
                             adresaclient:c.adresacompanie,
                             detalii:'Contravaloare abonament plan '+c.numeplan+' 12 luni la platforma programari online + offline elEvenTen Romania ',
                             suma:c.tarif*12,
                             idclinica:c.id
                            }
                          // console.log(proforma)
                           const facturanoua= await Factura.create(proforma)

                            const html = await View.render('facturaproforma', proforma)
                            const browser = await puppeteer.launch()
                            const page = await browser.newPage()
                            await page.goto(`http://localhost:3339/facturiproforme/${facturanoua.id}`, { waitUntil: 'networkidle0' })
                           // await page.setContent(html)
                            await page.emulateMediaType('screen')
                            const pdf = await page.pdf({ format: 'a4' })
                            await browser.close()


                            await Mail.send((message) => {
                                message
                                  .from('noreply@eleventen.ro')
                                  .to(c.email)
                                  .subject('Factura proforma abonament platforma elEvenTen - programari online si offline')
                                  .attachData(pdf, { filename: `facturaproforma_${proforma.nrfact}.pdf` })
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