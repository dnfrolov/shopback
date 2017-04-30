'use strict'

/* Do not over engineer until it's required */

const BaseError = require('./base-error')
const actionContainer = require('./container')

module.exports = {
  redeem
}

function redeem(url) {

  if (arguments.length > 1) {
    return Promise.reject(new BaseError('invalid number of arguments', {arguments}))
  }

  if (!url || typeof url !== 'string') {
    return Promise.reject(new BaseError(`invalid argument ${url}`, {url}))
  }

  return getSupportedUrls()
    .then(supported => {
      const isSupported = supported.find(a => a.toLowerCase() === url.toLowerCase())
      if (!isSupported) {
        throw new BaseError(`unsupported redeem url ${url}`, {url})
      }

      return `Visit https://${url} to start earning cashback!`
    })
}

function getSupportedUrls() {
  return Promise.resolve([
    'www.shopback.sg',
    'www.shopback.my',
    'www.shopback.co.id',
    'www.shopback.com.tw',
    'www.shopback.co.th',
    'www.shopback.com'
  ])
}

actionContainer.register('redeem', redeem)
