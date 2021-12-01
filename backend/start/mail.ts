/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Mail from '@ioc:Adonis/Addons/Mail'

Mail.monitorQueue((error, result) => {
  if (error) {
    console.log('Imposibil de trimis...')
    console.log(error.mail)
    return
  }


})