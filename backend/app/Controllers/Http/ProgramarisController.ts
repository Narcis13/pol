import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProgramarisController {

    public async formular({view}:HttpContextContract){
        return view.render('solicitareprogramare')
    }
}
