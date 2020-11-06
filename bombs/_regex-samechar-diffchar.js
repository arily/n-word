const prompts = require('prompts')
const sequence = require('../providers/charSequence')
const exposeSeq = {
  ...sequence,
  circle: sequence.includeShape.circle,
  arc: sequence.includeShape.arc
}
const tagMatch = /<((.)?\w+)>/g
const pattern2Regex = (pattern) => {
  const extendTags = pattern.match(tagMatch)
  const extend = extendTags ? extendTags.map(t => t.slice(1, -1)) : []
  pattern = pattern.replace(tagMatch, '#')
  pattern = pattern.split('').map((char) => {
    switch (char) {
      case '=':
        return `[${sequence.consonant.join('')}]`

      case '*':
        return `[${sequence.vowel.join('')}]`

      case '#': {
        const set = extend.shift()
        if (!set.startsWith('!')) return `[${exposeSeq[set].join('')}]`
        else return `[^${exposeSeq[set.slice(1)].join('')}]`
      }
      case '?':
        return '[a-z]'

      default:
        return char
    }
  }, [])
  return {
    pattern: new RegExp(pattern.join('') + '$'),
    length: pattern.length
  }
}

module.exports.name = 'regex-samechar-diffchar'
module.exports.description = 'regex匹配pattern，过滤同字符，过滤不同字符'
module.exports.find = async (words) => {
  const { patternStr, sameChar, diffChar } = await prompts([
    {
      type: 'text',
      name: 'patternStr',
      message: 'pattern?'
    },
    {
      type: 'text',
      name: 'sameChar',
      message: 'Same Chars? split pair with " ", split number with ","'
    },
    {
      type: 'text',
      name: 'diffChar',
      message: 'Different Chars? split pair with " ", split number with ","'
    }
  ])

  let matched = words

  if (patternStr) {
    const { pattern, length } = pattern2Regex(patternStr)
    console.log(pattern)
    matched = matched
      .reduce((acc, cur) => {
        if (cur.match(pattern)) acc.push(cur)
        return acc
      }, [])
      .filter((matched) => matched.length === length)
      .map((matched) => matched.toLowerCase())
  }

  if (sameChar) {
    const sameCharPair = sameChar.split(' ')
    matched = matched
      .map((word) => {
        const exploded = word.split('')
        const result = sameCharPair.every((pair) => {
          const charIndexs = pair.split(',')
          return charIndexs
            .map((charIndex) => charIndex - 1)
            .every((charIndex, index, arr) => {
              if (!index) return true
              const lastIndex = arr[index - 1]
              return exploded[charIndex] === exploded[lastIndex]
            })
        })
        if (result) return word
        return undefined
      })
      .filter((w) => w)
  }

  if (diffChar) {
    const sameCharPair = diffChar.split(' ')
    matched = matched
      .map((word) => {
        const exploded = word.split('')
        const result = sameCharPair.some((pair) => {
          const charIndexs = pair.split(',')
          return charIndexs
            .map((charIndex) => charIndex - 1)
            .some((charIndex, index, arr) => {
              if (!index) return false
              const lastIndex = arr[index - 1]
              return exploded[charIndex] === exploded[lastIndex]
            })
        })
        if (!result) return word
        return undefined
      })
      .filter((w) => w)
  }

  return matched
}
