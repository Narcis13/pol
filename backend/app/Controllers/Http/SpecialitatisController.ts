// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Specialitate from 'App/Models/Specialitate'

export default class SpecialitatisController {
    public async index(){
        const primaspecialitate= await Specialitate.first()
        return primaspecialitate?.denumire;
    }
}
