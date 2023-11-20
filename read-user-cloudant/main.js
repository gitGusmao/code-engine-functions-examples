async function main(args) {
  const { CloudantV1 } = require("@ibm-cloud/cloudant");

  const client = CloudantV1.newInstance();

  const dbName = args.dbName;
  const document = args.document;

  if (dbName == undefined || document == undefined)
    return {
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: "Informar dbName e document",
    };

  let response;

  await client
    .postFind({
      db: dbName,
      limit: 1,
      selector: {
        document: {
          $eq: document,
        },
      },
    })
    .then((res) => {
      res = res.result;
      response = res;

      if (res.docs.length > 0) response = res.docs[0];
    })
    .catch((err) => {
      response = err.error;
    });

  return {
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: response,
  };
}

module.exports.main = main;
