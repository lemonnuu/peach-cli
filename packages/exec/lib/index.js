const path = require('path')
const Package = require('@peach-cli/package')
const config = require('../config')
const log = require('@peach-cli/log')

module.exports = async (...args) => {
  const cmdObj = args[args.length - 1]
  const targetPath = process.env.CLI_TARGET_PATH
  const packageName = config[cmdObj.name()] // cmdObj.name() -> init
  const packageVersion = config.defaultPackageVersion //latest
  const cachePath = process.env.CLI_CACHE_DIR
  const registry = config.registry.taobao
  const pkg = new Package({
    targetPath,
    packageName,
    packageVersion,
    cachePath,
    registry,
  })
  if (!process.env.CLI_TARGET_PATH) {
    await pkg.updateOrDownload()
  }

  // --- 获取实际包
  const rootFilePath = pkg.getRootFilePath()
  log.debug('rootFilePath', rootFilePath, { head: 'Peach-cli' })
  if (rootFilePath) {
    return require(rootFilePath)(...args)
  } else {
    log.error('包路径不存在', pkg.targetPath, { head: true })
  }
}
