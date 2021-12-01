import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cabinets extends BaseSchema {
  protected tableName = 'cabinets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('denumire').notNullable()
      table.integer('idoperator').notNullable()
      table.text('dotare', 'mediumtext')
      table.text('servicii', 'mediumtext')
      table.string('orar')

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
