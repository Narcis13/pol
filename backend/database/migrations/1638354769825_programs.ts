import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Programs extends BaseSchema {
  protected tableName = 'programs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('idcabinet').notNullable()
      table.integer('ziuadinsaptamina').notNullable()
      table.integer('idserviciumedical').notNullable()
      table.time('orastart').notNullable()
      table.time('orastop').notNullable()
      table.integer('idmedic').notNullable()
      table.string('stare')


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
