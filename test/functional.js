'use strict'

require('should')

const requireGlob = require('require-glob')
const container = require('../app/container')

describe('ShopBack CLI', () => {

  before(() => {
    return requireGlob(['../app/**/*action.js'])
  })

  describe('Signup action', () => {

    it('should return correct award bonus for .sg', () => {

      return container.invoke('signup', ['www.shopback.sg'])
        .then(result => {
          result.should.equal('Award bonus: 5.00 SGD')
        })
    })

    it('should return correct award bonus for .my', () => {

      return container.invoke('signup', ['www.shopback.my'])
        .then(result => {
          result.should.equal('Award bonus: 10.00 MYR')
        })
    })
  })

  describe('Spend action', () => {

    const cazes = [
      {args: [0], expected: 'No cashback'},
      {args: [20], expected: 'Award cashback: 3.00'},
      {args: [100, 5], expected: 'Award cashback: 5.00'},
      {args: [10, 10, 10], expected: 'Award cashback: 1.00'},
      {args: [20, 10, 15], expected: 'Award cashback: 2.00'}
    ]

    cazes.forEach((caze => {
      it(`should return correct cashback reward ${caze.args}`, () => {

        return container.invoke('spend', caze.args)
          .then(result => {
            result.should.equal(caze.expected)
          })
      })
    }))
  })

  describe('Redeem action', () => {
    const cazes = [
      {args: ['www.shopback.sg'], expected: 'Visit https://www.shopback.sg to start earning cashback!'},
      {args: ['www.shopback.my'], expected: 'Visit https://www.shopback.my to start earning cashback!'}
    ]

    cazes.forEach((caze => {
      it(`should point to correct website ${caze.args}`, () => {

        return container.invoke('redeem', caze.args)
          .then(result => {
            result.should.equal(caze.expected)
          })
      })
    }))
  })
})
