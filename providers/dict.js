const fs = require("fs");
const dict = fs.readFileSync("./english-words-master/words.txt", "utf-8");
const words = dict.split("\n").filter((word) => word);

module.exports = words