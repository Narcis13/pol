/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'



Route.on('/').render('main')

Route.post('/validareemail', 'ClientsController.validare_email')
Route.post('/inregistrareclinica', 'ClientsController.inregistrareclinica')
Route.get('/creditsms', 'ClinicasController.creditsms')
Route.post('/trimitsmsanulare','ClinicasController.trimitsmsanulare')
Route.get('/facturiproforme/:idfact','ClientsController.oproforma')

Route.post('/programare', 'ProgramarisController.register')
Route.post('/anulareprogramare', 'ProgramarisController.anulareprogramare')
Route.get('/programarecabinet/:id', 'ProgramarisController.programarecabinet')
Route.get('/programaremedic', 'ProgramarisController.programaremedic')
Route.delete('/programare/:token', 'ProgramarisController.anulare')

Route.post('/program', 'ProgramsController.register').middleware('auth')
Route.post('/sarbatori', 'ProgramsController.sarbatoarenoua').middleware('auth')
Route.delete('/sarbatori/:id','ProgramsController.stergesarbatoare').middleware('auth')
Route.get('/program', 'ProgramsController.index').middleware('auth')
Route.get('/sarbatori', 'ProgramsController.sarbatori')
Route.get('/program/:id', 'ProgramsController.cabinetespecialitate')
Route.get('/programcabinet/:id/:kind', 'ProgramsController.programcabinet')
Route.patch('/program/:id','ProgramsController.updatesarbatoare').middleware('auth')
Route.delete('/program/:id','ProgramsController.deleteprogram').middleware('auth')

Route.get('/toatecabinetele', 'CabinetsController.index')
Route.post('/cabinete', 'CabinetsController.register').middleware('auth')
Route.patch('/cabinete/:id','CabinetsController.updatecabinet')
Route.delete('/cabinete/:id','CabinetsController.deletecabinet').middleware('auth')

Route.get('/solicitareprogramare/:slug', 'ProgramarisController.formular')
Route.get('/register', 'ClinicasController.formularInregistrare')
Route.get('/v/:id', 'ProgramarisController.verificprogramare')
Route.get('/solicitareprogramare', 'ProgramarisController.formulardedicat')
Route.get('/formularsatisfactie/:slug', 'ClinicasController.formularsatisfactie')
Route.post('/prelucraresatisfactie', 'ClinicasController.prelucraresatisfactie')
Route.post('/solicitareprogramare', 'ProgramarisController.solicitare')
Route.post('/solicitarereprogramare', 'ProgramarisController.solicitarereprogramare')
Route.get('/solicitari/:token','ProgramarisController.osolicitare')
Route.delete('/solicitari/:token','ProgramarisController.stergsolicitare').middleware('auth')
Route.get('/solicitarile/:cod','ProgramarisController.solicitari').middleware('auth')
Route.get('/raportprogramari', 'ProgramarisController.raportprogramari')
Route.get('/programaricabinet/:id', 'ProgramarisController.programaricabinet').middleware('auth')
Route.get('/oprogramare/:id', 'ProgramarisController.oprogramare').middleware('auth')

Route.get('/toatespecialitatile', 'SpecialitatisController.index').middleware('auth')
Route.post('/specialitati','SpecialitatisController.store').middleware('auth')
Route.patch('/specialitati/:id','SpecialitatisController.updatespecialitate').middleware('auth')
Route.delete('/specialitati/:id','SpecialitatisController.stergspecialitate').middleware('auth')

Route.post('/registeruser','AuthController.register').middleware('auth')
Route.get('/allusers','AuthController.index').middleware('auth')
Route.get('/alluserscabs','AuthController.alluserscabs').middleware('auth')
Route.patch('/users/:id','AuthController.updateuser').middleware('auth')
Route.delete('/users/:id','AuthController.deleteuser').middleware('auth')
Route.post('/login','AuthController.login')
Route.post('/logout','AuthController.logout')

Route.post('/servicii','ServiciusController.store').middleware('auth')
Route.get('/toateserviciile', 'ServiciusController.index').middleware('auth')
Route.patch('/servicii/:id','ServiciusController.updateserviciu')
Route.delete('/servicii/:id','ServiciusController.deleteserviciu').middleware('auth')

Route.post('/medici','MedicsController.register').middleware('auth')
Route.get('/totimedicii', 'MedicsController.index')
Route.get('/mediciperoperator/:id', 'MedicsController.medicioperator').middleware('auth')
Route.patch('/medici/:id','MedicsController.updatemedic').middleware('auth')
Route.delete('/medici/:id','MedicsController.deletemedic').middleware('auth')

Route.post('/indis','IndisponibilitatesController.register').middleware('auth')
Route.get('/indis', 'IndisponibilitatesController.index')
Route.get('/inditeste','IndisponibilitatesController.inditeste')
Route.get('/indisoperator/:id', 'IndisponibilitatesController.indisperoperator').middleware('auth')
Route.get('/indis/:id', 'IndisponibilitatesController.indisperspecialitate')
Route.patch('/indis/:id','IndisponibilitatesController.updatemedic')
Route.delete('/indis/:id','IndisponibilitatesController.deletemedic').middleware('auth')

Route.post('/uploadsigla','ClinicasController.uploadsigla')
Route.post('/uploadpozamedic','MedicsController.uploadpoza')
Route.post('/uploadpozacabinet','CabinetsController.uploadpoza')
Route.get('/clinici/:id', 'ClinicasController.oclinica')
Route.patch('/clinici/:id','ClinicasController.updateclinica').middleware('auth')