'use strict'

const data = require('./data')
const BaseError = require('../base-error')
const actionContainer = require('../container')

module.exports = {
  singup
}

function singup(url) {

  if (arguments.length > 1) {
    return Promise.reject(new BaseError('invalid number of arguments', {arguments}))
  }

  if (!url || typeof url !== 'string') {
    return Promise.reject(new BaseError('invalid url passed', {url}))
  }

  const regex = /.+\.(\w+)$/
  const matches = url.match(regex)
  const domain = matches && matches[1]

  if (!domain) {
    return Promise.reject(new BaseError('domain not defined'))
  }

  return data.getAwardAmount(domain)
    .then(award => {
      if (award) {
        return `Award bonus: ${award.amount} ${award.amount.currency}`
      }

      return 'No award'
    })
}

actionContainer.register('signup', singup)
