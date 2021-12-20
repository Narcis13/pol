import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Programarises extends BaseSchema {
  protected tableName = 'programarises'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
  
       table.integer('idsolicitare').notNullable()
       table.integer('idmedic').notNullable()
       table.integer('idcabinet').notNullable()
       table.integer('idserviciumedical').notNullable()
       table.integer('idprogram').notNullable()
       table.date('data').notNullable()
       table.time('orastart').notNullable()
       table.time('orastop').notNullable()
       table.integer('indexzi').notNullable()
       table.integer('indexslot').notNullable()
       table.string('stare')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
