import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa } from 'apollo-server-koa'
import { graphiqlKoa } from 'apollo-server-koa'

import dbCtx from './db'
import schema from './schema'

export default koaRouter()
  .get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
  .post('/graphql', koaBody(), graphqlKoa({ schema, context: dbCtx }))
