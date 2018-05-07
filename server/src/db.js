// create files on node_modules/secret.js
//
// module.exports = {
//   user: <username>,
//   password: <password>,
//   dbname: <dbname>
// }
import { user, password, dbname } from 'secret'
import Promise from 'bluebird'
import couchbase from 'couchbase'

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
couchbase.BucketImpl.mutateAsync = ({ method, id, params }) =>
  new Promise((resolve, reject) => {
    const builder = db.mutateIn(id)
    if (method === 'remove') {
      params.map(({ path, options }) => builder.remove(path, options))
    } else if (method === 'counter') {
      params.map(({ path, delta, options }) =>
        builder.remove(path, delta, options)
      )
    } else {
      params.map(({ path, value, options }) =>
        builder[method](path, value, options)
      )
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

export default db
