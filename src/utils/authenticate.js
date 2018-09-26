const decode = require('jwt-decode')
const isEmpty = require('./LangUtils')

const authenticate = token => {
  try {
    if (isEmpty(token)) {
      return { error: 'JWT required', status: 401 }
    }

    const { exp } = decode(token)
    if (exp * 1000 < Date.now()) {
      return { error: 'JWT expired', status: 401 }
    }

    return true
  } catch (error) {
    console.error(error) // eslint-disable-line no-console

    return { error: 'unknown erro' }
  }
}

module.exports = authenticate
