import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Clinica extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public denumire: string
  @column()
  public fisiersigla: string
  @column()
  public adresa: string
  @column()
  public email: string
  @column()
  public facebook: string
  @column()
  public instagram: string
  @column()
  public youtube: string
  @column()
  public numeconducere1: string
  @column()
  public numeconducere2: string
  @column()
  public numeconducere3: string
  @column()
  public telconducere1: string
  @column()
  public telconducere2: string
  @column()
  public telconducere3: string
  @column()
  public emailconducere1: string
  @column()
  public emailconducere2: string
  @column()
  public emailconducere3: string
  @column()
  public numepr: string
  @column()
  public telpr: string
  @column()
  public emailpr: string
  @column()
  public website: string
  @column()
  public urlpol: string
  @column()
  public slug: string
  @column()
  public idplan: number
  @column()
  public companie: string
  @column()
  public CUI: string
  @column()
  public adresacompanie: string
  @column()
  public stare: string
  @column()
  public observatii: string
  @column.dateTime()
  public starttrial: DateTime
  @column.dateTime()
  public stoptrial: DateTime
  @column.dateTime()
  public startabonament: DateTime
  @column.dateTime()
  public stopabonament: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
