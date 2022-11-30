const path = require('path')
const { homedir } = require('os')

module.exports = { CLI_CACHE_DIR: path.resolve(homedir(), './.peach-cli/dependencies'), CLI_TARGET_PATH: '' }
