
import { TNAMES, MULTITENANT } from '../consts'
import entity from 'entity-api-base'
const conf = {
  tablename: TNAMES.PROJEKTY,
  editables: ['nazev', 'popis', 'cena', 'stadium', 'poloha', 'zanr']
}

export default { create, update, list, canIUpdate }

async function list (query, orgid, knex) {
  query.filter = query.filter || {}
  MULTITENANT && Object.assign(query.filter, { orgid })
  return entity.list(query, conf, knex)
}

function create (data, author, orgid, knex) {
  data.manager = author
  MULTITENANT && Object.assign(data, { orgid })
  return entity.create(data, conf, knex)
}

function update (id, data, orgid, knex) {
  return entity.update(id, data, conf, knex)
}

async function canIUpdate (id, user, orgid, knex) {
  const cond = MULTITENANT ? { id, orgid } : { id }
  const p = await knex(TNAMES.PROJEKTY).where(cond).first()
  return p.manager.toString() === user.toString()
}