
module.exports.name = 'print'
module.exports.description = '打印所有词（一词一行）'
module.exports.find = (words, chain) => {
  chain.pop()
  console.log(words.join('\n'))
  return words
}
