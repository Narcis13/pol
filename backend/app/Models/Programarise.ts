import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { base64 } from '@ioc:Adonis/Core/Helpers'

export default class Programarise extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idsolicitare:number

  @column()
  public idcabinet:number

  @column()
  public idmedic:number

  @column()
  public idserviciumedical:number

  @column()
  public idprogram:number
  
  @column()
  public data: string

  @column()
  public orastart: string

  @column()
  public orastop: string

  @column()
  public indexzi:number

  @column()
  public indexslot:number

  @column()
  public stare: string

  @column()
  public token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashToken (p: Programarise) {
    //aici e o problema ca daca folosesc bcrypt nu pot folosi stringul generat ka token....(mai trebuie o prelucrare suplimenatare )
   let  shash=await Hash.make(DateTime.now().toString()+p.idsolicitare)
   p.token=base64.encode(shash)


   
  } 
}
