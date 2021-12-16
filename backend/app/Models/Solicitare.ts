import { DateTime } from 'luxon'
import { BaseModel, column ,beforeSave} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { base64 } from '@ioc:Adonis/Core/Helpers'
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
    //aici e o problema ca daca folosesc bcrypt nu pot folosi stringul generat ka token....(mai trebuie o prelucrare suplimenatare )
   let  shash=await Hash.make(DateTime.now().toString()+s.email)
   s.hash=base64.encode(shash)

     //console.log(s.hash.split('=').slice(-1)[0])  
   
  }
}
