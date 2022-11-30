const prepare = require('./prepare')
const registerCommand = require('./registerCommand')
const log = require('@peach-cli/log')

module.exports = async function core() {
  try {
    await prepare()
    registerCommand()
  } catch (err) {
    log.error(err.message, '', { head: true })
  }
}
