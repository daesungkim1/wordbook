import { merge } from 'lodash'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa } from 'apollo-server-koa'
import { graphiqlKoa } from 'apollo-server-koa'
import { makeExecutableSchema } from 'graphql-tools'

import db from './db'

import typeDefs from './typeDefs'
import Query from './query'
import Mutation from './mutation'

const resolvers = merge({ Query, Mutation })
const schema = makeExecutableSchema({ typeDefs, resolvers })

export default koaRouter()
  .get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
  .post('/graphql', koaBody(), graphqlKoa({ schema, context: { db } }))
