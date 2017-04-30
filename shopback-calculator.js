'use strict'

let requireGlob = require('require-glob')
let container = require('./app/container')

let [execPath, file, action, ...args] = process.argv
if (!action || typeof action !== 'string') {
  throw Error(`invalid action ${action}`)
}

requireGlob(['./app/**/*action.js'])
  .then(() => container.invoke(action, args))
  .then(result => console.log(result))
  .catch(err => {
    //log
    console.error(err.message, err.stack)
    process.exit(1)
  })
