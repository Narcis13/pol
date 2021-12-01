import { DateTime } from 'luxon'
import { BaseModel, column ,beforeSave} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
export default class Solicitare extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nume: string

  @column()
  public email: string

  @column()
  public telefon: string

  @column()
  public mesaj: string

  @column()
  public hash: string

  @column()
  public idspecialitate: number

  @column()
  public confirmat: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (s: Solicitare) {
    //console.log(s)
    s.hash=await Hash.make(DateTime.now().toString()+s.email)
   
     
   
  }
}
