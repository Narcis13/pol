import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Solicitares extends BaseSchema {
  protected tableName = 'solicitares'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nume').notNullable()
      table.string('email').notNullable()
      table.string('telefon').notNullable()
      table.integer('idspecialitate').notNullable()
      table.string('mesaj')
      table.boolean('confirmat')
      table.string('hash')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
