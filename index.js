var glob = require("glob"),
  path = require("path");
const prompts = require("prompts");

const plugins = glob
  .sync("./bombs/*.js")
  .map((file) => require(path.resolve(file)));
const words = require("./providers/dict");

console.info("😭 we got", words.length, "words in dict");

const filterJapanese = (words) =>
  words.reduce(
    (acc, cur) => {
      const first = cur.slice(0, 4);
      const second = cur.slice(4, 7);

      if (first === second) acc.filtered.push(cur);
      else acc.normal.push(cur);
      return acc;
    },
    {
      normal: [],
      filtered: [],
    }
  );

(async () => {
  while (1) {
    let result = words;

    console.info("\nstarting new search\n");

    while (1) {
      const { plugin } = await prompts([
        {
          type: "select",
          name: "plugin",
          message: "reduce using?",
          choices: plugins.map((plugin) => ({
            title: `${plugin.name}(${plugin.description || "no description"})`,
            value: plugin,
          })),
        },
      ]);

      if (!plugin) process.exit()

      result = await plugin.find(result);

      console.log("current result", filterJapanese(result));

      const { keep } = await prompts(
        {
          type: () => result.length > 1 ? "confirm" : null,
          name: "keep",
          message: "keep reducing?",
          initial: () => result.length > 10
        },
      );

      if (!keep) break;
    }
  }
})();
