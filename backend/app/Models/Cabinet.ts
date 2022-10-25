import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cabinet extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public denumire: string

  @column()
  public dotare: string
  @column()
  public servicii: string
  @column()
  public orar: string

  @column()
  public stare: string

  @column()
  public urlpoza: string

  @column()
  public idoperator:number

  @column()
  public idclinica:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
