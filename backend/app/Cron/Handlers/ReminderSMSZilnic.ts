//import path from 'path'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
//import { exec } from 'child_process'
//import Env from '@ioc:Adonis/Core/Env'
//import { existsSync, mkdirSync } from 'fs'
import Logger from '@ioc:Adonis/Core/Logger'

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
                    SELECT p.data dataprogramare, p.idsolicitare idsolicitare,s.telefon telefon,s.email email, c.smsapikey smsapikey, c.idplan idplan, substring(p.orastart,1,5) orastart, c.denumire numeclinica, m.nume numemedic, serv.denumire denumireserviciu FROM pols.programarises p
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
              console.log(linie.email)
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
