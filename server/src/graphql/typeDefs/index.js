import Enum from './Enum.graphql'
import Input from './Input.graphql'
import Scalar from './Scalar.graphql'
import Type from './Type.graphql'
import Mutation from '../mutation/Mutation.graphql'
import Query from '../query/Query.graphql'

// import as string
export default Scalar + Enum + Input + Type + Mutation + Query
