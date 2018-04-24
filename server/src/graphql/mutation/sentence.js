import * as docType from '../docType'
import uuid from 'uuid'

export default {
  /**
   * create sentence without comments
   */
  createSentence: async (obj, { sentence }, { db }) => {
    const key = uuid.v4()
    await db.insertAsync(key, {
      // TODO: do not manipulate raw JSON object
      key,
      type: docType.SENTENCE_V1,
      ...sentence,
    })
    const { value } = await db.getAsync(key)
    return value
  },

  /**
   * update sentence
   */
  updateSentence: async (obj, { key, sentence }, { db }) => {
    await db.upsertAsync(key, {
      // TODO: do not manipulate raw JSON object
      key,
      type: docType.SENTENCE_V1,
      ...sentence,
    })
    const { value } = await db.getAsync(key)
    return value
  },

  /**
   * add comments
   */
  insertCommnet: (obj, { key, comment }, { db }) => {},
}
