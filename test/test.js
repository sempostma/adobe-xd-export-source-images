const path = require('path')
const fs = require('fs')
const buffer = fs.readFileSync(path.join(__dirname, './fixtures/adobe.xd'))
const template = require('./fixtures/template.json')
template.body = buffer.toString('base64')
template.isBase64Encoded = true
require('../src/adobexd').extractImages(template)
  .then(result => {
    fs.writeFileSync(path.join(__dirname, './fixtures/output.zip'), result.body)
  }).catch(error => {
    console.error(error.stack || error)
  })

