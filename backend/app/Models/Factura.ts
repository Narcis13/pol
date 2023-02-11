import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Factura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public data: string

  @column()
  public tip: string
  @column()
  public nrfact: string
  @column()
  public numeclient: string
  @column()
  public cuiclient: string
  @column()
  public adresaclient: string

  @column()
  public detalii: string

  @column()
  public suma: number
  @column()
  public idclinica: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
