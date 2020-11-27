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
    (req, res, next) => { 
      projekty.canIUpdate(req.params.id, auth.getUID(req), knex).then(can => {
        return can ? next() : next(401)
      }).catch(next)
    },
    JSONBodyParser,
    (req, res, next) => {
      projekty.update(req.params.id, req.body, knex)
        .then(updated => { res.json(updated[0]) })
        .catch(next)
    })

  return app
}
