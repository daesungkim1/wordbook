import uuid from 'uuid'
import { merge } from 'ramda'

import EmptyDoc from '../../../build/empty_doc.json'

// TODO
//  1. set createBy when login session is ready
//  2. type string
export default ({ id, name, data }) => ({
  id,
  name,
  data,
  doc: merge(EmptyDoc[name], {
    ...data,
    id: id ? id : uuid.v4(),
    type: `${name}/v1`,
    created: new Date().getTime(),
    createdBy: '',
  }),
})
