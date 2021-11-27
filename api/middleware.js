
import { TNAMES } from '../consts'
const conf = {
  tablename: TNAMES.PROJEKTY,
  editables: ['nazev', 'popis', 'cena', 'stadium', 'poloha', 'zanr']
}

export default (ctx) => {
  const { knex, entityMWBase, ErrorClass } = ctx
  const entity = entityMWBase(conf, knex, ErrorClass)

  async function list (query, orgid) {
    query.filter = query.filter || {}
    Object.assign(query.filter, { orgid })
    return entity.list(query)
  }
  
  function create (data, author, orgid) {
    Object.assign(data, { orgid, manager: author })
    return entity.create(data)
  }
  
  function update (id, data, orgid) {
    return entity.update(id, data)
  }
  
  async function canIUpdate (id, user, orgid) {
    const cond = { id, orgid }
    const p = await knex(TNAMES.PROJEKTY).where(cond).first()
    return p.manager.toString() === user.toString()
  }
  
  return { create, update, list, canIUpdate }
}