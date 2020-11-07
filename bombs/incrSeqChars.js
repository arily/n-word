const prompts = require('prompts')
const { sequence } = require('../providers/charSequence')

module.exports.name = 'increment-sequenced-chars'
module.exports.description = '连续字符'
module.exports.find = async (matched) => {
  const { sequencedChars } = await prompts([
    {
      type: 'text',
      name: 'sequencedChars',
      message: 'sequenced chars? split pair with " ", split number with ","'
    }
  ])

  if (sequencedChars) {
    const newMatch = sequencedChars.split(' ')

    matched = matched.filter((word) => {
      const exploded = word.split('')
      return newMatch.every((match) => {
        const indexes = match.split(',')
        let gap
        return indexes.every((charIndex, index, arr) => {
          if (index === 0) {
            gap = 0
            return true
          }
          const nowIndex = sequence.findIndex(
            (char) => char === exploded[charIndex - 1]
          )
          const lastIndex = sequence.findIndex(
            (char) => char === exploded[arr[index - 1] - 1]
          )

          if (arr.length === 2) return nowIndex === lastIndex + 1 || nowIndex === lastIndex - 1

          if (index === 1) {
            gap = nowIndex - lastIndex
            if (![1, -1].includes(gap)) return false
          }
          return nowIndex === lastIndex + gap
        })
      })
    })
  }

  return matched
}
