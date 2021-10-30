import projekty from './middleware'
import loadOrgID from './orgid_man'

export default (ctx) => {
  const { knex, auth, JSONBodyParser } = ctx
  const app = ctx.express()

  app.get('/', loadOrgID, (req, res, next) => {
    projekty.list(req.query, req.orgid, knex).then(info => {
      res.json(info)
      next()
    }).catch(next)
  })

  app.post('/',
    loadOrgID,
    auth.required,
    JSONBodyParser,
    (req, res, next) => {
      projekty.create(req.body, auth.getUID(req), req.orgid, knex)
        .then(created => { res.json(created[0]) })
        .catch(next)
    })

  app.put('/:id',
    loadOrgID,
    auth.required,
    (req, res, next) => { 
      projekty.canIUpdate(req.params.id, auth.getUID(req), req.orgid, knex)
        .then(can => {
          return can ? next() : next(401)
        }).catch(next)
    },
    JSONBodyParser,
    (req, res, next) => {
      projekty.update(req.params.id, req.body, req.orgid, knex)
        .then(updated => { res.json(updated[0]) })
        .catch(next)
    })

  return app
}
