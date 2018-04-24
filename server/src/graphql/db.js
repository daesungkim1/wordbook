// create files on node_modules/secret.js
//
// module.exports = {
//   user: <username>,
//   password: <password>,
// }

import Promise from 'bluebird'
import couchbase from 'couchbase'
import { user, password } from 'secret'

const cluster = new couchbase.Cluster('couchbase://127.0.0.1/')
cluster.authenticate(user, password)

export default Promise.promisifyAll(cluster.openBucket('jadu'))
