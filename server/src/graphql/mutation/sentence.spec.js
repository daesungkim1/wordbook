import { graphql, buildSchema } from 'graphql'
import model from '../../model'
import schema from '../schema'
import CreateSentence from '../../scripts/graphql/mutation/CreateSentence.graphql'
import InsertComment from '../../scripts/graphql/mutation/Insertomment.graphql'

describe('[Mutation] Sentence', () => {
  it('create sentence', async () => {
    const params = {
      sentence: {
        text: 'This is some example sentence',
        translation: '이것은 번역문이 들어갈 자리이다.',
        desc: '문장에 대한 설명은 여기',
      },
    }

    try {
      const result = await graphql(
        schema,
        CreateSentence,
        null,
        { model },
        params
      )
      console.log(result)
    } catch (error) {
      throw Error(error)
    }

    // expect(result.data.createSentence).toBeDefined()
  })

  it.skip('add single comment', async () => {
    const param = {
      key: 'd484cfb8-1344-41a3-93d1-563aa52b2b10',
      comment: {
        refWord: 'example',
        desc: '',
        word_fk: null,
      },
    }

    const result = await graphql(schema, InsertComment, null, dbCtx, param)
    console.log(result)
    expect(result.data.insertComment).toBeDefined()
  })
})
