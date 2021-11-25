import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Indisponibilitate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idmedic: number
  
  @column()
  public tipindisponibilitate: string

  @column.dateTime()
  public datastart: DateTime

  @column.dateTime()
  public datastop: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
