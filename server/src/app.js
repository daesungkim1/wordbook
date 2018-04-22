import koa from 'koa'
import koaRouter from 'koa-router'
import uuid from 'uuid'

import { graphqlRouter } from './middlewares'

export default () => {
  const app = new koa()
  const router = new koaRouter()

  // responseTime
  app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Request-ID', uuid.v4())
    ctx.set('X-Response-Time', `${ms}ms`)
  })

  // graphql middleware
  router.use(graphqlRouter.routes())

  app.use(router.routes())
  app.use(router.allowedMethods())

  return app
}
