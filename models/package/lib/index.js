const path = require('path')
const fse = require('fs-extra')
const pathExists = require('path-exists').sync
const pkgDir = require('pkg-dir').sync
const npminstall = require('npminstall')
const { isPlainObject } = require('@peach-cli/utils')
const formatPath = require('@peach-cli/format-path')
const getLastVersion = require('@peach-cli/last-version')

const replaceSlach = (str) => {
  if (!str || typeof str !== 'string') return ''
  return str.replaceAll('/', '_')
}

class Package {
  constructor(options) {
    if (!options) {
      throw new Error('Package 类构造函数的 options 参数不能为空')
    }
    if (!isPlainObject(options)) {
      throw new Error('Package 类构造函数的 options 必须为普通对象')
    }
    // 目标包 package 路径
    this.targetPath = options.targetPath
    // package の name
    this.packageName = options.packageName
    // 文件缓存路径中间加一层转换后的包名
    this.generatorCacheDir = replaceSlach(this.packageName)
    // 包缓存完整路径
    this.cacheFullPath = ''
    // package 的 version
    this.packageVersion = options.packageVersion
    // 远程包的下载路径 cachePath
    this.cachePath = options.cachePath
    // 下载的仓库源地址
    this.registry = options.registry
  }

  getCacheFileName(version) {
    return `_${this.generatorCacheDir}@${version}@${this.packageName}`
  }

  // 判断 package 是否存在
  async isCacheAvailable() {
    const lastVersion = await getLastVersion(this.packageName)
    this.cacheFullPath = path.resolve(
      this.cachePath,
      this.generatorCacheDir,
      './node_modules',
      this.getCacheFileName(lastVersion)
    )
    if (!pathExists(this.cacheFullPath)) return false
    return true
  }

  // 远程下载 package
  async download() {
    const root = path.resolve(this.cachePath, this.generatorCacheDir)
    await npminstall({
      root,
      storeDir: path.resolve(root, './node_modules'),
      registry: this.registry,
      pkgs: [
        {
          name: this.packageName,
          version: this.packageVersion,
        },
      ],
    })
  }

  // 更新或安装 package
  async updateOrDownload() {
    if (!(await this.isCacheAvailable())) {
      const cacheDir = path.resolve(this.cachePath, this.generatorCacheDir)
      if (pathExists(cacheDir)) {
        await fse.remove(cacheDir)
      }
      await this.download()
    }
    return (this.targetPath = this.cacheFullPath)
  }

  // 获取入口文件的路径
  getRootFilePath() {
    if (!pathExists(this.targetPath)) return null
    const dir = pkgDir(this.targetPath)
    if (!dir) return null
    const packageJsonFile = require(path.resolve(dir, 'package.json'))
    if (!packageJsonFile || !packageJsonFile.main) return null
    return formatPath(path.resolve(dir, packageJsonFile.main))
  }
}

module.exports = Package
