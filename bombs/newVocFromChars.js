const prompts = require('prompts')
const words = require('../providers/dict')

module.exports.name = 'new-word-from-result'
module.exports.description = '用结果的字符生成新词，保留新词于词库中的原始词'
module.exports.find = async (matched) => {
  const { newVocFromChars } = await prompts([
    {
      type: 'text',
      name: 'newVocFromChars',
      message:
        'new word(s) combination from results? split pair with " ", split number with ","'
    }
  ])

  if (newVocFromChars) {
    const newMatch = newVocFromChars.split(' ')

    matched = matched.filter((word) => {
      const exploded = word.split('')
      return newMatch.every((match) => {
        const indexes = match.split(',')
        const newVocabulary = indexes
          .map((index) => exploded[index - 1])
          .join('')
        return words.find((word) => word === newVocabulary) !== undefined
      })
    })
  }

  return matched
}
