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

## 暂停

先暂停做这个项目, 因为发现架构的不太好, 后续会升级, 全面采取 TS。

其实这个架构有点麻烦, init 是实际的逻辑, 可以动态换, 但是我觉着是也要交互问答？而且对于个人项目来说根本没有必要的好伐, 下次会弃用这种模式, 采取 nomorepo + 分包的策略, 比如 log 就可以做的很好。

其实开发一个完善的脚手架还需要 后端, 调取 API 获取模板信息, 模板可发布到 npm 或 github, 推荐 npm, 因为下载的时候可以采取淘宝镜像, 而 Github 是要科学上网的。

然后下载回来后要采用 glob 和 ejs 替换模板内容, 比如版本号啥的, en... 这个仓库可以不废弃, 后续直接升级 TS + eslint

### 脚手架是否需要集成 CI/CD

觉着没必要, 因为这个都是动态的, 我觉着这部分去项目模板写 script 的方式比较好, 当然脚手架可以设计一个存储环境变量的操作, 可以设置一下常用的 github 地址? 然后 ejs 替换 script 脚本？感觉要学习一下 vue3 的管理方式。嗯...暂时废弃吧
