
import { TNAMES, getQB } from '../consts'
const conf = {
  tablename: TNAMES.PROJEKTY,
  editables: ['nazev', 'orgid', 'popis', 'cena', 'stadium', 'poloha', 'zanr']
}

export default (ctx) => {
  const { knex, ErrorClass } = ctx
  const entityMWBase = ctx.require('entity-api-base').default
  const entity = entityMWBase(conf, knex, ErrorClass)

  async function list (query, schema) {
    query.filter = query.filter || {}
    return entity.list(query, schema)
  }
  
  function create (data, author, schema) {
    Object.assign(data, { manager: author })
    return entity.create(data, schema)
  }
  
  function update (id, data, schema) {
    return entity.update(id, data, schema)
  }
  
  async function canIUpdate (id, user, schema) {
    const p = await getQB(knex, TNAMES.PROJEKTY, schema).where({ id }).first()
    return p.manager.toString() === user.toString()
  }
  
  return { create, update, list, canIUpdate }
}