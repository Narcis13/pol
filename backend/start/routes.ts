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
Route.on('/').render('welcome')

Route.get('posts/create', 'PostsController.create')
Route.post('posts', 'PostsController.store')


Route.get('/solicitareprogramare', 'ProgramarisController.formular')
Route.post('/solicitareprogramare', 'ProgramarisController.solicitare')

Route.get('/toatespecialitatile', 'SpecialitatisController.index')/*.middleware('auth')*/
Route.post('/specialitati','SpecialitatisController.store')
Route.patch('/specialitati/:id','SpecialitatisController.updatespecialitate')
Route.delete('/specialitati/:id','SpecialitatisController.stergspecialitate')

Route.post('/registeruser','AuthController.register')
Route.get('/allusers','AuthController.index')
Route.patch('/users/:id','AuthController.updateuser')
Route.delete('/users/:id','AuthController.deleteuser')
Route.post('/login','AuthController.login')
Route.post('/logout','AuthController.logout')

Route.post('/servicii','ServiciusController.store')
Route.get('/toateserviciile', 'ServiciusController.index')
Route.patch('/servicii/:id','ServiciusController.updateserviciu')
Route.delete('/servicii/:id','ServiciusController.deleteserviciu')

Route.post('/medici','MedicsController.register')
Route.get('/totimedicii', 'MedicsController.index')
Route.patch('/medici/:id','MedicsController.updatemedic')
Route.delete('/medici/:id','MedicsController.deletemedic')

Route.post('/indis','IndisponibilitatesController.register')
Route.get('/indis', 'IndisponibilitatesController.index')
Route.patch('/indis/:id','IndisponibilitatesController.updatemedic')
Route.delete('/indis/:id','IndisponibilitatesController.deletemedic')