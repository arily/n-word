const prompts = require('prompts')
const { sequence } = require('../providers/charSequence')

module.exports.name = 'charIndex sum'
module.exports.description = ' 所有字母index和'
module.exports.find = async (matched) => {
  const { chars, sum } = await prompts([
    {
      type: 'text',
      name: 'chars',
      message: 'included char indexs? split number use ","',
      validate: (res) => res.split(',').length > 0
    },
    {
      type: 'number',
      name: 'sum',
      message: 'sum?'
    }
  ])
  if (!chars || !sum) return matched

  matched = matched.filter(word => {
    const indexes = chars.split(',').map(index => index - 1)
    const exploded = word.split('')
    const _chars = indexes.map(index => exploded[index])
    const charIndexes = _chars.map(char => sequence.findIndex(seq => seq === char))
    return charIndexes.reduce((acc, val) => acc + val, 0) === sum
  })

  return matched
}
