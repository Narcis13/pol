import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Serviciu extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public denumire: string

  @column()
  public durata: number

  @column()
  public idclinica: number

  @column()
  public tarif: number

  @column()
  public stare:string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
