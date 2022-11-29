const iconArr = [
  '😀',
  '😁',
  '😂',
  '🤣',
  '😃',
  '😄',
  '😅',
  '😆',
  '😉',
  '😊',
  '😋',
  '😎',
  '😍',
  '🥰',
  '😗',
  '😙',
  '🙂',
  '🤗',
  '🤩',
  '🤔',
  '🤨',
  '😐',
  '😑',
  '😶',
  '🤤',
  '😒',
  '😓',
  '😔',
  '😈',
  '👿',
  '👹',
  '👺',
  '🐶',
  '😕',
  '🙃',
  '🤑',
  '😲',
  '😖',
  '😞',
  '😟',
  '😢',
  '😤',
  '😭',
  '😦',
  '😧',
  '😨',
  '😩',
  '🤯',
  '🤠',
  '🤥',
  '🤫',
  '🤭',
  '🧐',
  '🤓',
  '😡',
  '🤬',
  '😷',
  '🤒',
  '🤕',
  '🤢',
  '🤮',
  '☠️',
  '🈴',
  '🈲',
  '🈵',
  '🙄',
  '😏',
  '😣',
  '😥',
  '😮',
  '🤐',
  '😯',
  '😪',
  '😫',
  '🥱',
  '😴',
  '😌',
  '😛',
  '😜',
  '😝',
  '😬',
  '😰',
  '😱',
  '🥵',
  '🥶',
  '😳',
  '🤪',
  '😵',
  '🥴',
  '😠',
  '🤧',
  '😇',
  '🥳',
  '🥺',
  '👽',
  '🐷',
  '👀',
  '👄',
  '🧡',
  '💛',
  '💚',
  '💙',
  '💜',
  '🤎',
  '🖤',
  '🤍',
  '💔',
  '🈳',
  '🈹',
  '🈶',
  '🈚',
  '🈸',
  '🈺',
  '🈷️',
  '㊗️',
  '㊙️',
  '🉑',
  '🔞',
  '🔴',
  '🟠',
  '🟡',
  '🟢',
  '🔵',
  '🟣',
  '🟤',
  '⚫',
  '⚪',
  '😘',
  '🙁',
  '👾',
  '😚',
  '🥸 ',
  '💀',
  '🥲 ',
]

module.exports = {
  info: '💨',
  default: '👻',
  success: '✔️ ',
  error: '❌',
  warning: '💡',
  debug: '🤡',
  notice: '🙈',
  random: () => {
    const index = Math.floor(Math.random() * iconArr.length)
    return iconArr[index]
  },
}
