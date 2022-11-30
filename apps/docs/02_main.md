# 脚手架实现流程

总共将脚手架拆为了 4 块：

- 核心模块
- 命令模块
- 模型模块
- 工具模块

## core 模块

core 模块的开发分为 3 个阶段：准备阶段 -> 注册命令阶段 -> 执行阶段

### 准备阶段

检查版本号 -> 检查 node 版本 -> 检查 root 启动 -> 检查用户主目录 -> 检查入参 -> 检查环境变量 -> 检查是否为最新版本 -> 提示更新

- 检查 root 启动 是因为 root 用户创建的别人删不了, 我们要做降级操作, 防止后面出现权限问题
- 检查主目录是要做缓存操作, 拿不到主目录就做不了缓存(windows 不搞了)
- 环境变量也暂时不搞了

#### importLocal

如果开发时想用线上版本, 可以在本地安装一下线上版本的包, 然后可以根据启动路径判断用开发版本还是本地 node_modules 版本：

```js
const importLocal = require('import-local')

if (importLocal(__filename)) {
  require('npmlog').info('cli', '正在使用 peach-cli node_modules 本地版本')
} else {
  require('../lib')(process.argv.slice(2))
}
```

npmlog 库就是可以用来打印日志的, 也有颜色。但是还是用 chalk 吧

#### [root-check](https://www.npmjs.com/package/root-check)

如果是 root 进入程序降级为普通用户权限。

#### [semver](https://www.npmjs.com/package/semver)

用于检查版本号大小的。

#### 获取线上 npm 版本

npm 暴露了一个 GET API 可以获取包的所有信息, 诸如这样的：`https://registry.npmjs.org/@peach-cli/core`。

taobao 源也暴露了一个一样的 API：`https://registry.npmmirror.com/@peach-cli/core`。

### 命令实现逻辑

Peach-cli 和普通的脚手架有一丢丢区别, 普通的脚手架都是将所有的 command 注册在包的内部。Peach-cli 更像是一个中台 cli, 它要通过 `peach-cli init <cli-command>` 去手动注册一下命令。

这样做的好处是：

1. 可用分包处理, 将 command 拆解, 按需引入 command
2. peach-cli 更像是一个中台 cli

但是, cli-mammand 存哪是个问题,

一：本地开发
二：缓存？实际就下载的本地目录, 说什么缓存缓存

#### pkg-dir

可以获取到 package.json 所在目录
