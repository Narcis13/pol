import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Indisponibilitates extends BaseSchema {
  protected tableName = 'indisponibilitates'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('idmedic').notNullable()
      table.string('tipindisponibilitate').notNullable()
      table.date('datastart').notNullable()
      table.date('datastop').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
