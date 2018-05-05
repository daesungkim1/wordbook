import { keys } from 'lodash'
import refParser from 'json-schema-ref-parser'

import { readdirSync, writeFileSync } from 'fs'

const JSON_SCHEMA_DIR = `${__dirname}/../src/json_schema`
const BUILD_DIR = `${__dirname}/../build`

const fileNames = readdirSync(JSON_SCHEMA_DIR).filter(name =>
  /\.yml$/.test(name)
)

// build json schema
const getSchema = async () => {
  const obj = {}
  for (let name of fileNames) {
    const schema = await refParser.bundle(`${JSON_SCHEMA_DIR}/${name}`)
    obj[name.replace('.yml', '')] = schema
  }
  return obj
}

// build empty schema with default value
const getEmptyDoc = async () => {
  const obj = {}
  await Promise.all(
    fileNames.map(async name => {
      const schema = await refParser.resolve(`${JSON_SCHEMA_DIR}/${name}`)
      const fields = keys(schema.get(`${JSON_SCHEMA_DIR}/${name}#/properties`))

      obj[name.replace('.yml', '')] = fields.reduce((acc, field) => {
        acc[field] = schema.get(
          `${JSON_SCHEMA_DIR}/${name}#/properties/${field}/default`
        )
        return acc
      }, {})
    })
  )

  return obj
}

getSchema().then(schema => {
  writeFileSync(`${BUILD_DIR}/json_schema.json`, JSON.stringify(schema), {
    mode: 0o644,
  })
})

getEmptyDoc().then(emptyDoc => {
  writeFileSync(`${BUILD_DIR}/empty_doc.json`, JSON.stringify(emptyDoc), {
    mode: 0o644,
  })
})
