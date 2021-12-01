import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Program extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idoperator:number

  @column()
  public idcabinet:number

  @column()
  public ziuadinsaptamina:number

  @column()
  public idserviciumedical:number

  @column()
  public idmedic:number

  @column()
  public orastart: string

  @column()
  public orastop: string

  @column()
  public stare: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
