const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const iconMap = require('../icon/icon')

const log = function (...args) {
  log.info(...args)
}
log.chalk = chalk

// 判断 color 是 rgb 还是 hex 还是普通字符串
function colorType(color) {
  if (color instanceof Array) {
    return 'rgb'
  } else if (typeof color === 'string' && color.startsWith('#')) {
    return 'hex'
  }
  return 'custom'
}

// 生成不同的 chalk 方法
function generatorChalk(config = {}) {
  const { color, bgColor, bold, italic, underline } = config
  let res = chalk
  if (color) {
    switch (colorType(color)) {
      case 'rgb':
        res = res.rgb(color[0], color[1], color[2])
        break
      case 'hex':
        res = res.hex(color)
        break
      default:
        res = res[color]
        break
    }
  }
  if (bgColor) {
    switch (colorType(bgColor)) {
      case 'rgb':
        res = res.bgRgb(bgColor[0], bgColor[1], bgColor[2])
        break
      case 'hex':
        res = res.bgHex(bgColor)
        break
      default:
        const c = 'bg' + bgColor[0].toUpperCase() + bgColor.toLowerCase().substring(1)
        res = res[c]
        break
    }
  }
  bold ? (res = res.bold) : ''
  italic ? (res = res.italic) : ''
  underline ? (res = res.underline) : ''
  return res
}

function generatorColor() {
  const r = Math.floor(Math.random() * 257)
  const g = Math.floor(Math.random() * 257)
  const b = Math.floor(Math.random() * 257)
  return [r, g, b]
}

function outputLog(HeadChalk, titleChalk, msgChalk, logName, level = 2000) {
  return function (title, msg, config = {}) {
    if (this.level > level) return
    let { head, closeIcon } = config
    if (head && typeof head === 'boolean') {
      head = logName
    }
    let icon = iconMap[logName] || iconMap.default
    if (logName === 'random') {
      icon = iconMap.random()
      titleChalk = titleChalk.rgb(...generatorColor())
      HeadChalk = HeadChalk.bgRgb(...generatorColor())
      msgChalk = msgChalk.rgb(...generatorColor())
    }
    if (closeIcon && !head) {
      return console.log(`${titleChalk(title)}  ${msgChalk(msg)}`)
    }
    if (closeIcon && head) {
      return console.log(`${HeadChalk(head)}  ${titleChalk(title)}  ${msgChalk(msg)}`)
    }
    if (!closeIcon && !head) {
      return console.log(`${icon} ${titleChalk(title)}  ${msgChalk(msg)}`)
    }
    return console.log(`${icon} ${HeadChalk(head)}  ${titleChalk(title)}  ${msgChalk(msg)}`)
  }
}

log.addLog = function (logName, headStyle, titleStyle, msgStyle, level) {
  const HeadChalk = generatorChalk(headStyle)
  const titleChalk = generatorChalk(titleStyle)
  const msgChalk = generatorChalk(msgStyle)
  this[logName] = outputLog(HeadChalk, titleChalk, msgChalk, logName, level)
}

const configFiles = fs.readdirSync(path.resolve(__dirname, '../config'))
configFiles.forEach((file) => {
  const config = require(path.resolve(__dirname, `../config/${file}`))
  log.addLog(file.split('.')[0], config.headStyle, config.titleStyle, config.msgStyle, config.level)
})

log.level = 2000

module.exports = log
