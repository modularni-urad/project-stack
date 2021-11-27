import express from 'express'
import { initErrorHandlers, APIError } from 'modularni-urad-utils'
import entityMWBase from 'entity-api-base'
import { attachPaginate } from 'knex-paginate'
const SessionServiceMock = require('modularni-urad-utils/test/mocks/sessionService')

process.env.DATABASE_URL = ':memory:'
process.env.NODE_ENV = 'test'
process.env.SESSION_SERVICE_PORT = 24000
process.env.SESSION_SERVICE = `http://localhost:${process.env.SESSION_SERVICE_PORT}`

module.exports = function (g) {
  const port = process.env.PORT || 3333
  Object.assign(g, {
    port,
    baseurl: `http://localhost:${port}`,
    mockUser: { id: 42 },
    sessionBasket: []
  })
  g.require = function(name) {
    try {
      return require(name)
    } catch (err) {
      console.error(err)
    }    
  }
  g.sessionSrvcMock = SessionServiceMock.default(process.env.SESSION_SERVICE_PORT, g)

  const dbinit = require('./dbinit').default

  g.InitApp = async function (ApiModule) {
    const auth = require('modularni-urad-utils/auth').default
    const knex = await dbinit()
    attachPaginate()
    await ApiModule.migrateDB(knex)

    const app = express()
    app.use((req, res, next) => {
      req.tenantid = 'testtenant'
      next()
    })
    const appContext = { 
      express, knex, auth, 
      bodyParser: express.json(),
      ErrorClass: APIError,
      entityMWBase,
      require: function(name) {
        try {
          return require(name)
        } catch (err) {
          console.error(err)
        }    
      }
    }
    const mwarez = ApiModule.init(appContext)
    app.use(mwarez)

    initErrorHandlers(app)

    return new Promise((resolve, reject) => {
      g.server = app.listen(g.port, '127.0.0.1', (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  g.close = async function() {
    g.server.close()
    g.sessionSrvcMock.close()
  }
}