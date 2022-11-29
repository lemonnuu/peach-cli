#! /usr/bin/env node

const importLocal = require('import-local')
const log = require('@peach-cli/log')

if (importLocal(__filename)) {
  log('cli', '正在使用 peach-cli node_modules 本地版本')
} else {
  require('../lib')(process.argv.slice(2))
}
