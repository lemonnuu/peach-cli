const semver = require('semver')
const pkg = require('../package.json')
const constant = require('./constant')
const getLastVersion = require('@peach-cli/last-version')
const log = require('@peach-cli/log')
const config = require('../config')

// 检查版本号
const checkPkgVersion = async () => {
  const lastVersion = await getLastVersion(pkg.name)
  if (semver.gt(lastVersion, pkg.version)) {
    log.warning(`请手动更新${pkg.name}, 当前版本: ${pkg.version}, 最新版本: ${lastVersion}`, '', {
      head: 'Peach-cli',
      closeIcon: true,
    })
    log.random(`更新命令:`, `npm install -g ${pkg.name}`, {
      head: 'Peach-cli',
      closeIcon: true,
    })
  } else {
    // log.random(`v${pkg.version}`, '', { head: 'Peach-cli', closeIcon: false })
  }
}

// 检查 node 版本 与如果是 Root 降级处理
const checkNodeVersionAndRoot = () => {
  if (semver.lt(process.version, constant.LOWEST_NODE_VERSION)) {
    throw new Error(`peach-cli 需要安装 v${constant.LOWEST_NODE_VERSION} 以上的 Node.js`)
  }
  require('root-check')()
}

// 设置缓存目录环境变量
const setProcessEnv = () => {
  process.env.CLI_CACHE_DIR = config.CLI_CACHE_DIR
}

module.exports = async () => {
  await checkPkgVersion()
  checkNodeVersionAndRoot()
  setProcessEnv()
}
