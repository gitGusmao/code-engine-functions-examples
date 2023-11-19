const { CloudantV1 } = require("@ibm-cloud/cloudant");

require("dotenv").config();

const client = CloudantV1.newInstance();

async function readUser(jsonString) {
  const jsonObject = JSON.parse(jsonString);

  const dbName = jsonObject["dbName"];
  const document = jsonObject["document"];

  console.log(dbName, document);

  if (dbName == undefined || document == undefined)
    return res.status(404).send({
      message: "Error",
    });

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
      if (res.docs.length > 0) response = res.docs[0];
    })
    .catch((err) => {
      response = err.error;
    });

  return response;
}

module.exports.readUser = readUser;

// if (process.argv.length > 2) {
//   const jsonString = process.argv[2];
//   readUser(jsonString);
// } else {
//   console.error(
//     "Informar dbName e document"
//   );
// }
