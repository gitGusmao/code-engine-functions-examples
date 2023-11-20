function main(args) {
  const LoremIpsum = require("lorem-ipsum").LoremIpsum;
  const lorem = new LoremIpsum();

  return {
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: args,
  };
}

module.exports.main = main;