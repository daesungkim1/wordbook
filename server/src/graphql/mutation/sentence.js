export default {
  /**
   * create sentence without comments
   */
  createSentence: async (obj, { sentence }, { model }) => {
    try {
      const Sentence = model({ name: 'sentence', data: sentence })
      Sentence.validate()
      const result = await Sentence.save()
      return { key: Sentence.doc.id, status: true }
    } catch (error) {
      //TODO when promise is rejected...
    }
  },

  /**
   * update sentence
   */
  updateSentence: async (obj, { key, sentence }, { model }) => {
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
  insertComment: async (obj, { key, comment }, { model }) => {
    try {
      await util.mutateAsync({
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
