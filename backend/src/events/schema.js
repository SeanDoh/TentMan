const eventBody = {
  type: 'object',
  required: [ 'title', 'event_date' ],
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    details: { type: 'string' },
    event_date: { type: 'string' }
  },
  additionalProperties: false
}
console.log(new Date().toString())
const climateGraphQueryString = {
  type: 'object',
  properties: {
    hours_back: {type: 'integer'}
  }
}

module.exports.eventSchema = {
  body: eventBody
}

module.exports.climateGraphSchema = {
  querystring: climateGraphQueryString
}