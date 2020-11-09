const fs = require('fs')
const dict = fs.readFileSync('./english-words-master/words.txt', 'utf-8')
const words = new Set(dict.split('\n').filter((word) => word).map(word => word.toLowerCase()))

module.exports = words
