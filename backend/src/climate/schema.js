const climateReadingBody = {
  type: 'object',
  required: [ 'sensor_name', 'temperature', 'humidity' ],
  properties: {
    sensor_name: { type: 'string' },
    temperature: { type: 'string' },
    humidity: { type: 'string' }
  },
  additionalProperties: false
}

const climateGraphQueryString = {
  type: 'object',
  properties: {
    hours_back: {type: 'integer'}
  }
}

module.exports.climateReadingSchema = {
  body: climateReadingBody
}

module.exports.climateGraphSchema = {
  querystring: climateGraphQueryString
}