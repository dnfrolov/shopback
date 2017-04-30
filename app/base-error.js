'use strict'

class BaseError extends Error {

  constructor(message, opts) {
    super(message)
    this.opts = opts

    Error.captureStackTrace(this, BaseError)
  }
}

module.exports = BaseError
