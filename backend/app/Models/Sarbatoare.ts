import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sarbatoare extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public detalii: string
  
  @column()
  public zi: number

  @column()
  public luna: number

  @column()
  public idclinica: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}