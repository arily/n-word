const prompts = require("prompts");

const pattern2Regex = (pattern) => {
  pattern = pattern.split("").map((char) => {
    switch (char) {
      case "=":
        return "[A-Za-z]";

      case "*":
        return "[AEIOUaeiou]";
      default:
        return "";
    }
  });
  return new RegExp(pattern.join("") + "$");
};

module.exports.name = "regex-samechar-diffchar";
module.exports.description = "regex匹配pattern，过滤同字符，过滤不同字符";
module.exports.find = async (words) => {
  const { patternStr, sameChar, diffChar } = await prompts([
    {
      type: "text",
      name: "patternStr",
      message: "pattern?",
    },
    {
      type: "text",
      name: "sameChar",
      message: 'Same Chars? split pair with " ", split number with ","',
    },
    {
      type: "text",
      name: "diffChar",
      message: 'Different Chars? split pair with " ", split number with ","',
    },
  ]);

  let matched = words

  if (patternStr) {
    const pattern = pattern2Regex(patternStr);
    console.log(pattern);
    matched
      .reduce((acc, cur) => {
        if (cur.match(pattern)) acc.push(cur);
        return acc;
      }, [])
      .filter((matched) => matched.length === patternStr.length)
      .map((matched) => matched.toLowerCase());
  }

  if (sameChar) {
    const sameCharPair = sameChar.split(" ");
    matched = matched
      .map((word) => {
        const exploded = word.split("");
        const result = sameCharPair.every((pair) => {
          const charIndexs = pair.split(",");
          return charIndexs
            .map((charIndex) => charIndex - 1)
            .every((charIndex, index, arr) => {
              if (!index) return true;
              const lastIndex = arr[index - 1];
              return exploded[charIndex] === exploded[lastIndex];
            });
        });
        if (result) return word;
      })
      .filter((w) => w);
  }

  if (diffChar) {
    const sameCharPair = diffChar.split(" ");
    matched = matched
      .map((word) => {
        const exploded = word.split("");
        const result = sameCharPair.some((pair) => {
          const charIndexs = pair.split(",");
          return charIndexs
            .map((charIndex) => charIndex - 1)
            .some((charIndex, index, arr) => {
              if (!index) return false;
              const lastIndex = arr[index - 1];
              return exploded[charIndex] === exploded[lastIndex];
            });
        });
        if (!result) return word;
      })
      .filter((w) => w);
  }

  return matched;
};
