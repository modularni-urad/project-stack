import { TNAMES } from '../consts'

exports.up = (knex, Promise) => {
  const builder = process.env.CUSTOM_MIGRATION_SCHEMA
    ? knex.schema.withSchema(process.env.CUSTOM_MIGRATION_SCHEMA)
    : knex.schema

  return builder.createTable(TNAMES.PROJEKTY, (table) => {
    table.increments('id').primary()
    table.string('orgid').notNullable()
    table.string('nazev', 512).notNullable()
    table.string('popis', 2048)
    // table.string('cilove_skupiny')
    // table.string('negativni_vlivy')
    table.string('manager', 64)
    table.float('cena')
    table.string('poloha').notNullable()
    table.string('stadium', 16).notNullable().defaultTo('draft')
    table.string('zanr', 16).notNullable()
    table.timestamp('created').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  const builder = process.env.CUSTOM_MIGRATION_SCHEMA
    ? knex.schema.withSchema(process.env.CUSTOM_MIGRATION_SCHEMA)
    : knex.schema

  return builder.dropTable(TNAMES.PROJEKTY)
}