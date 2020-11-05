const prompts = require("prompts");
const sequence = require('../providers/charSequence')

module.exports.name = 'geometric sequence'
module.exports.description = '字符间等比数列'
module.exports.find = async (matched) => {
  const { sequencedChars } = await prompts([
    {
      type: "text",
      name: "sequencedChars",
      message: 'sequenced chars? split pair with " ", split number with ","',
    },
  ]);

  if (sequencedChars) {
    const newMatch = sequencedChars.split(" ");

    matched = matched.filter((word) => {
      const exploded = word.split("");
      return newMatch.every((match) => {
        const indexes = match.split(",");

        
        let last

        return indexes.every((charIndex, index, arr) => {
          if (index === 0) return true;
          const nowIndex = sequence.findIndex(
            (char) => char === exploded[charIndex - 1]
          );
          const lastIndex = sequence.findIndex(
            (char) => char === exploded[arr[index - 1] - 1]
          );
          
          if (index === 1) {
            last = nowIndex / lastIndex
            return true
          }
          
          return nowIndex / lastIndex === last
        });
      });
    });
  }

  return matched
};
