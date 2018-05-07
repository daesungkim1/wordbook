export default {
  /**
   * create sentence without comments
   */
  createSentence: async (obj, { sentence }, { Model }) => {
    try {
      const Sentence = Model({ name: 'sentence', data: sentence })
      Sentence.validate()
      const result = await Sentence.save()
      console.log(result)
      return { id: Sentence.doc.id, status: true }
    } catch (error) {
      //TODO when promise is rejected...
      console.log(error)
    }
  },

  /**
   * update sentence
   */
  updateSentence: async (obj, { id, sentence }, { Model }) => {
    try {
      const Sentence = Model({ id, name: 'sentence', data: sentence })
      const result = await Sentence.update()
      return { id: Sentence.doc.id, status: true }
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * delete sentence
   */
  deleteSentence: async (obj, { id }, { Model }) => {
    try {
      const Sentence = Model({ id, name: 'sentence' })
      const result = await Sentence.remove()
      return { id: Sentence.doc.id, status: true }
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * add comments
   */
  insertComment: async (obj, { id, sentence }, { Model }) => {
    try {
      const Sentence = Model({ id, name: 'sentence', data: sentence })
      const result = await Sentence.addComment()
      return { id: Sentence.doc.id, status: true }
    } catch (error) {
      console.log(error)
    }

    const { value } = await db.getAsync(key)
    return value
  },
}
