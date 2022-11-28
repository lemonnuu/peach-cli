# peach-cli

脚手架第一战

## 坑啊

### [rimraf](https://www.npmjs.com/package/rimraf)

windows 不支持 `rm -f` 命令, 比如：`rm -rf node_modules` 😭。

所以需要安装 rimraf 库帮我们做 windows 的兼容：

```shell
pnpm install rimraf -D
```

然后用 `rimraf` 替代 `rm -rf` 即可：

```json
"scripts": {
  "clean": "rimraf .turbo && rimraf node_modules && rimraf dist"
}
```

使用 rimraf 还是没有原生的 `rm- rf` 好, 删除 node_modules 目录会报错, 有点铁锅炖自己的感觉, 虽然可以删掉。有钱还是得搞个苹果, 唉。

下面列举一些 windows 操作目录的其它库：

- 新增目录, 等同于 `mkdir -p`：[make-dir-cli](https://www.npmjs.com/package/make-dir-cli)
- 文件或目录的复制, 等同于 `cp -r`：[cpr](https://www.npmjs.com/package/cpr)

### [dotenv-cli](https://www.npmjs.com/package/dotenv-cli)

开发过程中, 可能经常需要使用环境变量来自定义程序的行为, 比如 `NODE_ENV`。

在以前使用 cross-env 这个库来帮助我们解决这个问题：

```shell
pnpm install cross-env
```

```json
"scripts": {
  "dev": "cross-env NODE_ENV=devlopment node index.js",
}
```

现在推荐一个更好用的工具 dotenv-cli, 它除了和 cross-env 一样可以在命令行中使用之外, 还可以定义 .env 文件。

```shell
pnpm install dotenv-cli
```

在命令行中定义环境变量需要加一个 `-v`, 且优先级最高：

```json
"scripts": {
  "dev": "dotenv -v NODE_ENV=devlopment node index.js",
}
```

也在项目根目录创建 .env 文件：

```
NODE_ENV=devlopment
```

但是在脚本中, 需要使用 `--` 分隔 `dotenv`

```json
"scripts": {
  "dev": "dotenv -- node index.js",
}
```
