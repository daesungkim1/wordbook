import uuid from 'uuid'

import * as docType from '../docType'

export default {
  /**
   * create sentence without comments
   */
  createSentence: async (obj, { sentence }, { db }) => {
    const key = uuid.v4()
    await db.upsertAsync(key, {
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
  insertComment: async (obj, { key, comment }, { db, mutateAsync }) => {
    try {
      await mutateAsync({
        method: 'arrayAppend',
        key,
        path: 'comments',
        value: comment,
      })
    } catch (error) {
      console.log(error)
      return error
    }

    const { value } = await db.getAsync(key)
    return value
  },
}
