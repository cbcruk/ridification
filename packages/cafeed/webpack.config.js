const merge = require('@cbcruk/webext-build/merge')

module.exports = (_env, { mode }) =>
  merge(mode, {
    entry: {
      background: './source/background',
      popup: './source/popup'
    }
  })
