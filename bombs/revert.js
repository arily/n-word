module.exports.name = 'revert'
module.exports.description = '撤销'
module.exports.find = (words, chain) => {
  if (chain.length) chain.pop()
  if (chain.length) return chain.pop()
  return words
}
