import koaRouter from 'koa-router'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

import schema from './schema' // graphql Schema
import model from '../model' // data model

export default koaRouter()
  .get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
  .post('/graphql', graphqlKoa({ schema, context: { model } }))
