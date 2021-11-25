import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Medic extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nume: string

  @column()
  public grad: string

  @column()
  public competente: string

  @column()
  public urlpoza: string

  @column()
  public mail: string

  @column()
  public codparafa: string

  @column()
  public idspecialitate:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
