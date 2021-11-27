import path from 'path'
import initApi from './api/routes'

export async function migrateDB (knex) {
  const opts = {
    directory: path.join(__dirname, 'migrations')
  }
  return knex.migrate.latest(opts)
}

export const init = initApi
