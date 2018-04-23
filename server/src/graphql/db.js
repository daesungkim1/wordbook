import nano from 'nano'
import Promise from 'bluebird'

export default Promise.promisifyAll(nano('http://127.0.0.1:5984/wordbook'));
