import { merge } from 'ramda'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './typeDefs'
import Query from './query'
import Mutation from './mutation'

import typeResolvers from './resolvers'

export default makeExecutableSchema({
  typeDefs,
  resolvers: merge({ Query, Mutation }, typeResolvers),
})
