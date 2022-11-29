const registry = require('../config/registry')
const urlJoin = require('./url-join')
const superagent = require('superagent')
const semver = require('semver')

module.exports = async (packageName, registryOrigin = registry.npm) => {
  const url = urlJoin(registryOrigin, packageName)
  const { text } = await superagent.get(url).catch((err) => {
    return Promise.reject(err)
  })
  const versions = Array.from(Object.keys(JSON.parse(text).versions))
  const lastversion = versions.sort((a, b) => (semver.gt(a, b) ? -1 : 1))[0]
  return lastversion
}
