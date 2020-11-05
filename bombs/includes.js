const prompts = require('prompts')

module.exports.name = 'includes'
module.exports.description = '词中包含chars'
module.exports.find = async (words) => {
  const { charsSet, mode } = await prompts([
    {
      type: 'text',
      name: 'charsSet',
      message: 'included chars? split pair with " "'
    },
    {
      type: (prev) => prev.split(' ').length > 1 ? 'select' : null,
      name: 'mode',
      message: 'match some or match every?',
      choices: [
        { title: 'some', value: 'some' },
        { title: 'every', value: 'every' }
      ],
      initial: 'some'
    }
  ])
  if (!charsSet) return words

  const charsArray = charsSet.split(' ')
  return words.filter(word => {
    // console.log(mode)
    return charsArray[mode || 'some']((chars) => {
      return word.includes(chars)
    })
  })
}
