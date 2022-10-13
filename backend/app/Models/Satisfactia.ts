import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Satisfactia extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idclinica: number
  @column()
  public impresie: string
  @column()
  public sectie: string
  @column()
  public primainternare: string
  @column()
  public cunostintadrepturi: string
  @column()
  public respectaredrepturi: string
  @column()
  public motivaredrepturi: string
  @column()
  public informarereguli: string
  @column()
  public insotitor: string
  @column()
  public calitateconditii: string
  @column()
  public curatenie: string
  @column()
  public atitudinecpu: string
  @column()
  public atitudineprimire: string
  @column()
  public timpacordat: string
  @column()
  public calitatemedic: string
  @column()
  public calitateasistente: string
  @column()
  public calitateinfirmiere: string
  @column()
  public amabilitate: string
  @column()
  public disponibilitate: string
  @column()
  public calitatemasa: string
  @column()
  public distribuirehrana: string
  @column()
  public ingrijirepostoperatorie: string
  @column()
  public insotitoraltesectii: string
  @column()
  public transport: string
  @column()
  public administraremedicamente: string
  @column()
  public supraveghereadministrare: string
  @column()
  public provenientamedicatie: string
  @column()
  public aspectsalon: string
  @column()
  public aspectspatii: string
  @column()
  public aspectcurte: string
  @column()
  public calitateinformatii: string
  @column()
  public calitatecomunicare: string
  @column()
  public reinternare: string
  @column()
  public recomandare: string
  @column()
  public observatii: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
