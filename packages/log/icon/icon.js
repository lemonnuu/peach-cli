const iconArr = [
  '๐',
  '๐',
  '๐',
  '๐คฃ',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐ฅฐ',
  '๐',
  '๐',
  '๐',
  '๐ค',
  '๐คฉ',
  '๐ค',
  '๐คจ',
  '๐',
  '๐',
  '๐ถ',
  '๐คค',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐ฟ',
  '๐น',
  '๐บ',
  '๐ถ',
  '๐',
  '๐',
  '๐ค',
  '๐ฒ',
  '๐',
  '๐',
  '๐',
  '๐ข',
  '๐ค',
  '๐ญ',
  '๐ฆ',
  '๐ง',
  '๐จ',
  '๐ฉ',
  '๐คฏ',
  '๐ค ',
  '๐คฅ',
  '๐คซ',
  '๐คญ',
  '๐ง',
  '๐ค',
  '๐ก',
  '๐คฌ',
  '๐ท',
  '๐ค',
  '๐ค',
  '๐คข',
  '๐คฎ',
  'โ ๏ธ',
  '๐ด',
  '๐ฒ',
  '๐ต',
  '๐',
  '๐',
  '๐ฃ',
  '๐ฅ',
  '๐ฎ',
  '๐ค',
  '๐ฏ',
  '๐ช',
  '๐ซ',
  '๐ฅฑ',
  '๐ด',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐ฌ',
  '๐ฐ',
  '๐ฑ',
  '๐ฅต',
  '๐ฅถ',
  '๐ณ',
  '๐คช',
  '๐ต',
  '๐ฅด',
  '๐ ',
  '๐คง',
  '๐',
  '๐ฅณ',
  '๐ฅบ',
  '๐ฝ',
  '๐ท',
  '๐',
  '๐',
  '๐งก',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐ค',
  '๐ค',
  '๐ค',
  '๐',
  '๐ณ',
  '๐น',
  '๐ถ',
  '๐',
  '๐ธ',
  '๐บ',
  '๐ท๏ธ',
  'ใ๏ธ',
  'ใ๏ธ',
  '๐',
  '๐',
  '๐ด',
  '๐ ',
  '๐ก',
  '๐ข',
  '๐ต',
  '๐ฃ',
  '๐ค',
  'โซ',
  'โช',
  '๐',
  '๐',
  '๐พ',
  '๐',
  '๐ฅธ ',
  '๐',
  '๐ฅฒ ',
]

module.exports = {
  info: '๐จ',
  default: '๐ป',
  success: 'โ๏ธ ',
  error: 'โ',
  warning: '๐ก',
  debug: '๐คก',
  notice: '๐',
  random: () => {
    const index = Math.floor(Math.random() * iconArr.length)
    return iconArr[index]
  },
}
