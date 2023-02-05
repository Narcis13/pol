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
      //  console.log('Lungime ...',deTransmis.length)                  
/**
 * 




 */
        /*const DB_CREDENTIALS = {
          db: Env.get('MYSQL_DB_NAME'),
          user: Env.get('MYSQL_USER'),
          password: Env.get('MYSQL_PASSWORD'),
        }

        if (!DB_CREDENTIALS.db || !DB_CREDENTIALS.user) {
          throw new Error('Invalid credentials')
        }

        this.logger.info('DbBackupHandler: DB Backup started at: %s', NOW)

        const fileName = `${DB_CREDENTIALS.db}-${DateTime.now().toFormat('yyyy-LL-dd-HH-mm-ss')}.gz`
        const relativeDirName = 'backups'
        const fullDirName = `${path.join(process.cwd(), relativeDirName)}`
        const fullFilePath = `${fullDirName}/${fileName}`

        // Create the backup directory if not exists
        if (!existsSync(relativeDirName)) {
          mkdirSync(relativeDirName)
        }

        exec(
          `mysqldump -u${DB_CREDENTIALS.user} -p${DB_CREDENTIALS.password} --compact ${DB_CREDENTIALS.db} | gzip > ${fullFilePath}`,
          async (error, _stdout, stderr) => {
            if (stderr) {
              this.logger.info('DbBackupHandler: %s', stderr)
            }
            if (error) {
              return reject(error)
            }
            this.logger.info('DbBackupHandler: Local backup created at: %s', NOW)
            this.logger.info('DbBackupHandler: Backup completed at: %s', NOW)
            resolve('done')
          }
        )*/
      } catch (error) {
        reject(error)
      }
    })
  }
}
