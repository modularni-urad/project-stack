import Middlewarez from './middleware'

export default (ctx) => {
  const { auth, bodyParser, ErrorClass } = ctx
  const projekty = Middlewarez(ctx)
  const app = ctx.express()

  app.get('/', (req, res, next) => {
    projekty.list(req.query, req.tenantid).then(info => {
      res.json(info)
    }).catch(next)
  })

  app.post('/',
    auth.session,
    auth.required,
    bodyParser,
    (req, res, next) => {
      projekty.create(req.body, auth.getUID(req), req.tenantid)
        .then(created => { res.json(created[0]) })
        .catch(next)
    })

  app.put('/:id',
    auth.session,
    (req, res, next) => { 
      projekty.canIUpdate(req.params.id, auth.getUID(req), req.tenantid)
        .then(can => {
          return can ? next() : next(new ErrorClass(401, 'you cannot update'))
        }).catch(next)
    },
    bodyParser,
    (req, res, next) => {
      projekty.update(req.params.id, req.body, req.tenantid)
        .then(updated => { res.json(updated[0]) })
        .catch(next)
    })

  return app
}
