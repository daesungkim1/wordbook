// create files on node_modules/secret.js
//
// module.exports = {
//   user: <username>,
//   password: <password>,
//   dbname: <dbname>
// }

import Promise from 'bluebird'
import couchbase from 'couchbase'
import { user, password, dbname } from 'secret'

// promisify
couchbase.BucketImpl = Promise.promisifyAll(couchbase.BucketImpl.prototype)

const cluster = new couchbase.Cluster('couchbase://127.0.0.1/')
cluster.authenticate(user, password)

/**
 * Bucket
 */
const db = cluster.openBucket(dbname)

/**
 * mutate docuemnt utility
 *
 * arrayAddUnique(path, value, options) → {MutateInBuilder}
 * arrayAppend(path, value, options) → {MutateInBuilder}
 * arrayAppendAll(path, values, options) → {MutateInBuilder}
 * arrayInsert(path, value, options) → {MutateInBuilder}
 * arrayInsertAll(path, values, options) → {MutateInBuilder}
 * arrayPrepend(path, value, options) → {MutateInBuilder}
 * arrayPrependAll(path, values, options) → {MutateInBuilder}
 *
 * insert(path, value, options) → {MutateInBuilder}
 * replace(path, value, options) → {MutateInBuilder}
 * upsert(path, value, options) → {MutateInBuilder}
 *
 * counter(path, delta, options) → {MutateInBuilder}
 * remove(path, options) → {MutateInBuilder}
 */
const mutateAsync = ({ method, key, path, value, options, delta }) =>
  new Promise((resolve, reject) => {
    const builder = db.mutateIn(key)
    if (method === 'remove') {
      builder.remove(path, options)
    } else if (method === 'counter') {
      builder.counter(path, delta, options)
    } else {
      builder[method](path, value, options)
    }
    builder.execute((error, response) => {
      if (error) {
        reject({
          statusCode: 500,
          body: {
            title: 'mutateAsync Error',
            desc: 'please check path or MutationBuilder method name',
          },
        })
      }
      resolve(response)
    })
  })

export default { db, util: { mutateAsync } }
