
import { whereFilter } from 'knex-filter-loopback'
import _ from 'underscore'
import { TNAMES } from '../consts'

export default { create, update, list, canIUpdate }

function list (query, knex) {
  const perPage = Number(query.perPage) || 10
  const currentPage = Number(query.currentPage) || null
  const fields = query.fields ? query.fields.split(',') : null
  const sort = query.sort ? query.sort.split(':') : null
  const filter = query.filter ? JSON.parse(query.filter) : null
  let qb = knex(TNAMES.PROJEKTY)
  qb = filter ? qb.where(whereFilter(filter)) : qb
  qb = fields ? qb.select(fields) : qb
  qb = sort ? qb.orderBy(sort[0], sort[1]) : qb
  return currentPage ? qb.paginate({ perPage, currentPage }) : qb
}

const editables = [
  'nazev', 'popis', 'cena', 'stadium', 'poloha', 'zanr'
]

function create (data, author, knex) {
  data = _.pick(data, editables)
  data.manager = author
  return knex(TNAMES.PROJEKTY).insert(data).returning('*')
}

function update (id, data, knex) {
  data = _.pick(data, editables)
  return knex(TNAMES.PROJEKTY).where({ id }).update(data).returning('*')
}

function canIUpdate (id, user, knex) {
  return knex(TNAMES.PROJEKTY).where({ id }).first().then(p => {
    return Number(p.manager) === Number(user)
  })
}