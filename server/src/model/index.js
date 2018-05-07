import { pipe } from 'ramda'

import withDoc from './util/withDoc'
import withValidate from './util/withValidate'

import db from '../db'
import sentence from './sentence'
import word from './word'

const withModel = { sentence, word }

export default (conf: { id: string, name: string, data: any }) =>
  pipe(withDoc, withValidate, withModel[conf.name](db))(conf)
