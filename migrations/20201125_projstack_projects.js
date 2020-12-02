import { TNAMES } from '../consts'

exports.up = (knex, Promise) => {
  return knex.schema.createTable(TNAMES.PROJEKTY, (table) => {
    table.increments('id').primary()
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
  return knex.schema.dropTable(TNAMES.PROJEKTY)
}