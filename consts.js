
export const TNAMES = {
  PROJEKTY: 'projekty'
}

export const ROLE = {
  PROJECT_INSERTER: 'project_inserter'
}

export function getQB (knex, tablename, schema) {
  return schema
    ? knex(knex.ref(tablename).withSchema(schema))
    : knex(tablename)
}