import projekty from './projekty'
import { ROLE } from '../consts'

export default (ctx) => {
  const { knex, auth, JSONBodyParser } = ctx
  const app = ctx.express()

  app.get('/', (req, res, next) => {
    projekty.list(req.query, knex).then(info => {
      res.json(info)
      next()
    }).catch(next)
  })

  app.post('/',
    auth.requireMembership(ROLE.PROJECT_INSERTER),
    JSONBodyParser,
    (req, res, next) => {
      projekty.create(req.body, auth.getUID(req), knex)
        .then(created => { res.json(created) })
        .catch(next)
    })

  app.put('/:id',
    auth.requireMembership(ROLE.ADMIN_BODY),
    JSONBodyParser,
    (req, res, next) => {
      body.update(req.params.id, req.body, knex)
        .then(created => { res.json(created) })
        .catch(next)
    })

  return app
}
