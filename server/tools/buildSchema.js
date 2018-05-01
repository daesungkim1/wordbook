import refParser from 'json-schema-ref-parser'
import fs from 'fs'

const JSON_SCHEMA_DIR = `${__dirname}/../src/json_schema/`
const BUILD_DIR = `${__dirname}/../build/json_schema/`

const fileNames = fs
  .readdirSync(JSON_SCHEMA_DIR)
  .filter(name => /\.yml$/.test(name))

fileNames.map(name => {
  refParser
    .bundle(`${JSON_SCHEMA_DIR}/${name}`)
    .then(schema => console.log(schema))
})
