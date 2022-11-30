const path = require('path')

module.exports = (p) => {
  const sep = path.sep
  if (sep !== '\\' || typeof p !== 'string') return p
  return p.replaceAll('\\', '/')
}
