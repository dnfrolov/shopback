'use strict'

/* NOTE: unit tests are omitted because one sample is done for award */

const BaseError = require('./base-error')
const actionContainer = require('./container')

/**
 * @param {Number[]} spendings
 * @returns {Promise<String>} Cashback awarded rounded to 2 decimal places
 */
function spend(...spendings) {

  if (!spendings || !Array.isArray(spendings) || !spendings.length) {
    return Promise.reject(new BaseError('invalid spendings passed', {spendings}))
  }

  const parsedSpendings = spendings.map(s => Number(s))

  const notNumber = parsedSpendings.find(s => Number.isNaN(s))
  if (notNumber) {
    return Promise.reject(new BaseError(`invalid argument ${notNumber}`, {notNumber}))
  }

  return getCashBackRewardSettings()
    .then(settings => {

      const rule = settings.find(st => parsedSpendings.every(sp => sp >= st.level))
      if (!rule) {
        return Promise.reject(new BaseError('appropriate settings not found', {spendings, settings}))
      }

      const max = Math.max(...parsedSpendings)
      const cashback = Math.round(max * rule.cashBackPercent) / 100
      if (!cashback) {
        return 'No cashback'
      }

      return `Award cashback: ${cashback.toFixed(2)}`
    })
}

/* NOTE: there is no benefit of moving data function out */

function getCashBackRewardSettings() {

  return Promise.resolve([
    {level: 50, cashBackPercent: 20, priority: 1},
    {level: 20, cashBackPercent: 15, priority: 2},
    {level: 10, cashBackPercent: 10, priority: 3},
    {level: 0, cashBackPercent: 5, priority: 4}
  ])
}

actionContainer.register('spend', spend)
