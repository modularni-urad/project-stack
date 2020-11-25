import initProjektyRoutes from './api/projekty_routes'

export default (ctx) => {
  const app = ctx.express()

  app.use('/projekty', initProjektyRoutes(ctx))

  return app
}
