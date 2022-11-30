const commander = require('commander')
const pkg = require('../package.json')
const log = require('@peach-cli/log')
const exec = require('@peach-cli/exec')

const program = new commander.Command()

module.exports = () => {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version, '-v, --version', '输出版本号')
    .option('-d, --debug', '是否开启调试模式', false)
    .option('-tp --targetPath <targetPath>', '手动指定目标路径', '')

  program
    .command('init [projectName??]')
    .option('-f, --force', '是否强制初始化项目')
    .description('初始化脚手架, 注册命令')
    .action(exec)

  // 监听 debug 模式, 放着玩儿
  program.on('option:debug', () => {
    log.level = 1000
    log.debug('已开启 debug 模式', '', { head: 'Peach-cli' })
  })

  // 手动指定目标路径, 放缓存里面
  program.on('option:targetPath', (value) => {
    process.env.CLI_TARGET_PATH = value
  })

  // 对未知命令监听
  program.on('command:*', (command) => {
    const availableCommands = program.commands.map((cmd) => cmd.name())
    log.error('未知的命令:', command[0], { head: 'Peach-cli' })
    if (availableCommands.length) {
      log('可用命令', availableCommands.join(', '), { head: 'Peach-cli' })
    }
  })

  program.parse(process.argv)
}
