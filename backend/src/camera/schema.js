const cameraBody = {
  type: 'object',
  required: [ 'name', 'url', 'hours_to_keep' ],
  properties: {
    name: { type: 'string' },
    url: { type: 'string' },
    hours_to_keep: { type: 'string' }
  },
  additionalProperties: false
}

const climateGraphQueryString = {
  type: 'object',
  properties: {
    hours_back: {type: 'integer'}
  }
}

module.exports.cameraSchema = {
  body: cameraBody
}

module.exports.climateGraphSchema = {
  querystring: climateGraphQueryString
}