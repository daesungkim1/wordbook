import * as docType from '../docType'

// Mutation for sentence/comments
export default {
  createSentence: (obj, { sentence }, { db }) => {
    const doc = { ...sentence, docType: docType.SENTENCE_V1 }
    return db.insertAsync(doc).then(({ id, rev }) => ({ ...doc, id, rev }))
  },

  updateSentence: (obj, { id: _id, rev: _rev, sentence }, { db }) => {
    const doc = { ...sentence, _id, _rev }
    // TODO fix
    return db.insertAsync(doc).then(({ id, rev }) => ({ ...doc, id, rev }))
  },
  /*
  updateCommnet: (obj, { comment, wordId }, { db }) => {
    const { id, rev, refWord, desc } = comment
    const item = { refWord, desc, wordId }
    const doc = { id, rev, comments: [item] }
    return db.insertAsync(doc).then(({ id, rev }) => ({ ...doc, id, rev }))
  },
  */
}
