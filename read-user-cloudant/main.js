function main(args) {

  const { CloudantV1 } = require("@ibm-cloud/cloudant");

  const dbName = args.dbName;
  const document = args.document;


  return {
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: dbName,
  };
}

module.exports.main = main;
