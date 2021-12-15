import path from 'path'
import initApi from './api/routes'

export async function migrateDB (knex, schemas = null) {
  const opts = {
    directory: path.join(__dirname, 'migrations')
  }
  async function migrate2schema(schemaName) {
    await knex.raw(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`)
    const o = Object.assign({}, opts, { schemaName })
    process.env.CUSTOM_MIGRATION_SCHEMA = schemaName
    await knex.migrate.latest(o)
  }
  return schemas
    ? schemas.reduce((p, schema) => {
        return p.then(() => migrate2schema(schema))
      }, Promise.resolve())
    : knex.migrate.latest(opts)
}

export const init = initApi
