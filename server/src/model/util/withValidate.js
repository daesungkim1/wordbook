import Ajv from 'ajv'
import JsonSchema from '../../../build/json_schema.json'

export default ({ name, ...props }) => ({
  name,
  ...props,
  schema: JsonSchema[name],
  validate() {
    const validate = new Ajv().compile(JsonSchema[name])
    const isValid = validate(this.doc)
    this.errors = validate.errors
    this.isValid = isValid
    return isValid
  },
})
