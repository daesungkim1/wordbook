import refParser from 'json-schema-ref-parser'

describe('sentence', () => {
  it('sentence v1', async () => {
    const res = await refParser.bundle('src/json_schema/sentence.yml')
    expect(res).toMatchSnapshot()
  })

  it('word v1', async () => {
    const res = await refParser.bundle('src/json_schema/word.yml')
    expect(res).toMatchSnapshot()
  })
})
