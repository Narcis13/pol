import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Medics extends BaseSchema {
  protected tableName = 'medics'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.string('nume').notNullable()
      table.string('grad').notNullable()
      table.string('competente')
      table.string('urlpoza')
      table.string('mail')
      table.string('codparafa').notNullable()
      table.integer('idspecialitate')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
