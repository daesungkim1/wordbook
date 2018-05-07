import { graphql, buildSchema } from 'graphql'
import Model from '../../model'
import schema from '../schema'
import CreateSentence from '../../scripts/graphql/mutation/CreateSentence.graphql'
import UpdateSentence from '../../scripts/graphql/mutation/UpdateSentence.graphql'
import DeleteSentence from '../../scripts/graphql/mutation/DeleteSentence.graphql'
import InsertComment from '../../scripts/graphql/mutation/Insertomment.graphql'

describe('[Mutation] Sentence', () => {
  it.skip('create sentence', async () => {
    const params = {
      sentence: {
        text: 'This is some example sentence',
        translation: '이것은 번역문이 들어갈 자리이다.',
        desc: '새로운 문장 설명은 여기',
      },
    }

    try {
      const result = await graphql(
        schema,
        CreateSentence,
        null,
        { Model },
        params
      )
      console.log(result)
    } catch (error) {
      throw Error(error)
    }

    // expect(result.data.createSentence).toBeDefined()
  })

  it.skip('update sentence', async () => {
    const params = {
      id: '0bfab8ea-a1fa-4313-aa2f-8fca9928e43a',
      sentence: {
        desc: '이것만 고쳐봐라',
      },
    }

    try {
      const result = await graphql(
        schema,
        UpdateSentence,
        null,
        { Model },
        params
      )
      console.log(result)
    } catch (error) {
      throw Error(error)
    }

    // expect(result.data.createSentence).toBeDefined()
  })

  it.skip('delete sentence', async () => {
    const params = { id: 'd484cfb8-1344-41a3-93d1-563aa52b2b10' }
    try {
      const result = await graphql(
        schema,
        DeleteSentence,
        null,
        { Model },
        params
      )
      console.log(result)
    } catch (error) {
      throw Error(error)
    }
  })

  it('add single comment', async () => {
    const params = {
      id: '15542c6b-aa3a-42a5-b2a9-284a4230406e',
      sentence: {
        comments: {
          refWord: 'example-3',
          desc: '99',
          word_fk: null,
        },
      },
    }
    try {
      const result = await graphql(
        schema,
        InsertComment,
        null,
        { Model },
        params
      )
      console.log(result)
    } catch (error) {}

    // expect(result.data.insertComment).toBeDefined()
  })
})
