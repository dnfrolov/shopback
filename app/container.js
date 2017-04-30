'use strict'

const container = []

module.exports = {
  invoke(name, args) {
    const action = container.find(a => a.name === name.toLowerCase())
    if (!action) {
      throw new Error(`Action is not registered ${name}`)
    }

    return action.fn.call(null, ...args)
  },

  register(name, fn) {
    container.push({name: name.toLowerCase(), fn})
  }
}
