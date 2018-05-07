import { keys, find, propEq } from 'ramda'

export default db => props => {
  const { doc, isValid, data } = props

  const save = () => db.upsertAsync(doc.id, doc)
  const remove = () => db.removeAsync(doc.id)

  const update = () => {
    const params = keys(data).reduce(
      (acc, field) => acc.concat({ path: field, value: data[field] }),
      []
    )
    return db.mutateAsync({ id: doc.id, method: 'replace', params })
  }

  const addComment = async () => {
    const params = keys(data).reduce(
      (acc, field) => acc.concat({ path: field, value: data[field] }),
      []
    )

    // 1. get comments from existing document.
    // 2. if same refWord found, update the comments field only
    //    otherwise, append
    const {
      value: { comments: givenComments },
    } = await db.getAsync(doc.id)

    const dupRefWord = find(propEq('refWord', data.comments.refWord))(
      givenComments
    )
    console.log(params)
    // TODO check arrayAddUnique
    return db.mutateAsync({
      method: dupRefWord ? 'arrayAddUnique' : 'arrayAppend',
      id: doc.id,
      params,
    })
  }

  return {
    ...props,
    save,
    update,
    remove,
    addComment,
  }
}
