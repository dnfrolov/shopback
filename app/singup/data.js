'use strict'

/* NOTE DataBase might be used */

const Money = require('js-money')

module.exports = {
  getAwardAmount
}

function getAwardAmount(domain) {

  const found = [
    {domain: 'sg', amount: Money.fromDecimal(5, 'SGD')},
    {domain: 'my', amount: Money.fromDecimal(10, 'MYR')},
    {domain: 'id', amount: Money.fromDecimal(25000, 'IDR')},
    {domain: 'tw', amount: Money.fromDecimal(1000, 'TWD')},
    {domain: 'th', amount: Money.fromDecimal(500, 'THB')},
    {domain: 'com', amount: Money.fromDecimal(5, 'USD')}
  ].find(i => i.domain === domain)

  return Promise.resolve(found)
}
