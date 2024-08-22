export default class GeneralError extends Error {
  constructor(messages = null, statusCode = 400, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GeneralError)
    }

    this.name = 'AxiosError'
    // Custom debugging information
    this.errors = messages
    this.statusCode = statusCode
  }
}
