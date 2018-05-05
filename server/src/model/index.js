import flow from 'lodash/fp/flow'

import withDoc from './util/withDoc'
import withValidate from './util/withValidate'
import withModel from './util/withModel'

export default (conf: { name: string, data: any }) =>
  flow(withDoc, withValidate, withModel)(conf)
