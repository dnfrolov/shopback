'use strict'

require('should')
const sinon = require('sinon')
const Money = require('js-money')
const proxyquire = require('proxyquire').noCallThru()

const data = {}

const modulee = proxyquire('./action', {
  './data': data
})

describe('Award Calculator', () => {

  beforeEach(() => {
    return data.getAwardAmount = () => Promise.resolve()
  })

  it('should return correct awards for domain', () => {

    const amount = Money.fromDecimal(1, 'USD')
    data.getAwardAmount = sinon.stub().resolves(amount)

    return modulee.singup('www.domain.com')
      .then(() => {
        sinon.assert.calledWith(data.getAwardAmount, 'com')
      })
  })

  it('should return correct rewards for sub-domain', () => {

    const amount = Money.fromDecimal(35, 'THB')
    data.getAwardAmount = sinon.stub().resolves(amount)

    return modulee.singup('www.domain.com.th')
      .then(() => {
        sinon.assert.calledWith(data.getAwardAmount, 'th')
      })
  })

  it('should return error when domain is missing', () => {
    return modulee.singup('www').should.rejectedWith(/domain not defined/)
  })

  it('should return error in case domain can\'t be parsed', () => {
    return modulee.singup(null).should.rejectedWith(/invalid url passed/)
  })
})
