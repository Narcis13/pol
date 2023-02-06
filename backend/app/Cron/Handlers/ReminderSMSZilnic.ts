//import path from 'path'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
import Mail from '@ioc:Adonis/Addons/Mail'
//import { exec } from 'child_process'
//import Env from '@ioc:Adonis/Core/Env'
//import { existsSync, mkdirSync } from 'fs'
import Logger from '@ioc:Adonis/Core/Logger'
const axios = require('axios');

export default class DailyDbBackupHandler {
  private logger: typeof Logger

  constructor() {
    this.logger = Logger
  }

  public run() {
    return new Promise(async (resolve, reject) => {
      try {
        const NOW = DateTime.now().toFormat('yyyy-LL-dd HH:mm:ss')
        this.logger.info('Procesul de trimitere in masa SMS a inceput la: %s', NOW)
        const qRemainder = `
                    SELECT p.data dataprogramare, p.idsolicitare idsolicitare,s.telefon telefon,s.email email, c.smsapikey smsapikey, c.idplan idplan, substring(p.orastart,1,5) orastart, c.denumire numeclinica, m.nume numemedic, serv.denumire denumireserviciu, s.nume numepacient FROM pols.programarises p
                    INNER JOIN pols.solicitares s on s.id=p.idsolicitare
                    INNER JOIN pols.clinicas c on c.id=p.idclinica
                    INNER JOIN medics m on m.id=p.idmedic
                    INNER JOIN servicius serv on serv.id=p.idserviciumedical
                    WHERE DATE(p.data) = ADDDATE(CURDATE(),1) and p.stare='activ'
        
        `
        const deTransmis = await Database
                          .rawQuery(qRemainder)
           
           deTransmis[0].map(linie=>{
          //  console.log(linie)
            if(linie.idplan>1){
              //trimit mail
               Mail.send((message) => {
                message
                  .from('programari@eleventen.ro')
                  .to(linie.email)
                  .subject('Nu uitați de programarea de mâine')
                  .htmlView('emails/reminder', { linie })
              })
             
            }

            if(linie.idplan>2){
              //trimite sms
              var mesaj=`Nu uitati de programarea de maine la ${linie.orastart}, ${linie.numeclinica}.Va asteptam!`
              mesaj=mesaj.split(' ').join('%20')
              var options = {
                method: 'POST',
                url: `https://app.smso.ro/api/v1/send?to=%204${linie.telefon}&sender=4&body=${mesaj}`,
                headers: {
                  Accept: '*/*',
                  'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
                  'X-Authorization': linie.smsapikey
                }
              };
                try {
                     axios.request(options)

          
                  } catch (error) {
                    console.log(error);
                  }

            }
           })               

      } catch (error) {
        reject(error)
      }
    })
  }
}
