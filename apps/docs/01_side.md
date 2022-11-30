# 笔记

## 在没有 workspace 时, 是怎么解决本地相互依赖问题的？

我们知道, 大概三四年前, 都是通过 Learn 管理 monorepo 项目的, 阅读它的源码你会发现, 它是依靠 `file:` 来链接的, 而不是 `npm link` 手动去链接, 就有点 workspace 那味了。我们自己开发脚手架也可以这样：

```json
"dependencies": {
  "@peach-cli/utils": "file:../packages/utils"
},
```

然后通过 Learn 进行 publish 操作的时候它会帮我们把这种形式重新转化为版本号, 如 `^0.0.1`。

## 命令行参数处理

大家都知道, `process.argv` 抛去前俩个可以接收命令行的参数, 如果我们自己处理就太麻烦了, 有俩个库可以帮我们实现, 推荐 commander:

- [commander](https://www.npmjs.com/package/commander)
- [yargs](https://www.npmjs.com/package/yargs)

## require() 可以导入哪几种类型的文件

`require()` 可以导入 3 种类型的文件, 分别是 `.js`、`.json` 和 `.node`

- js : 导入的 JS 文件内部必须有导出, 也就是必须含有 `module.exports/exports`
- json : 会对 JSON 文件进行 `JSON.parse()` 再导入
- node : 一般是用 C++ 编写的 node 插件, 会使用 `process.dlopen()` 解析, 一般用不到

特别说明, 当不是上面三种时, 统一当作 JS 文件解析, 也就是如果 .txt 文件里面是正常的 JS 内容也 OK。

## axios 请求数据"乱码"

在 node 里使用 axios 请求数据有时"乱码", 比如请求 npm API：

```js
axios.get('https://registry.npmjs.org/@peach-cli/core').then((res) => {
  console.log(res.data) // 乱码
})
```

这个问题的主要原因是 axios 默认给我们配上了 `{'Accept-Encoding': 'gzip, deflate, br'}` 的请求头, 查看 responseHeader 会发现返回的 `{'content-encoding': 'gzip'}`, 经过了一层编码当然哦豁了。

这个配置在浏览器是没任何问题的, 因为浏览器会给我们进行处理, 但是 Node 不行。

解决办法就是将 Accept-Encoding 请求头去掉, 这样返回的内容就不会经过编码了。

注：在 node 可以使用 [superagent](https://www.npmjs.com/package/superagent) 库, 没有此类问题。

## commander

commander 中 command 所属的 action 中参数 optionValues 只能拿到自己的, 如果是在全局注册是 option 是在其 `parent._optionValues` 里面。有一种好的做法是放缓存里边儿。
