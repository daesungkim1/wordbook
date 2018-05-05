import db from '../../db'

// Model objects
import sentence from '../sentence'
import word from '../word'

const mapper = { sentence, word }

export default ({ name, ...props }) => ({
  name,
  ...props,
  ...mapper[name](db),
})
