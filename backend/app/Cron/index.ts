
import scheduler from 'node-schedule'
//import Env from '@ioc:Adonis/Core/Env'
import Logger from '@ioc:Adonis/Core/Logger'
import ReminderSMSZilnic from './Handlers/ReminderSMSZilnic'
import AnalizorSituatieClienti from './Handlers/AnalizaSituatieClienti'

/**
 * Runs every 12 hours
 */
scheduler.scheduleJob('10 11 * * *', async function () {
  //const isDbBackupsEnabled = Env.get('ENABLE_DB_BACKUPS')
   await new AnalizorSituatieClienti()
     .run()
     .catch((error) => Logger.error('Analizor Situatie Clienti,: %o', error))

    await new ReminderSMSZilnic()
      .run()
      .catch((error) => Logger.error('SMS Bulk Handler,: %o', error))
  
})

Logger.info('In-process Cron Jobs Inregistrat')