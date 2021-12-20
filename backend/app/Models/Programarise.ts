import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
