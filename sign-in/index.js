const CryptoJS = require('crypto-js');
const { AES, enc } = CryptoJS;

const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "users",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};


module.exports = async function (context, req) {

    let user = {
        caseID: req.query.caseID,
        password: req.query.password,
    }

    let status = await validateSignIn(user);

    let response = {
        resp : status
    }

    context.res = {
        body: response,
        headers: {   
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Credentials' : true
        }
    };
}

function decryptText(encryptedText) {
    const decrypted = AES.decrypt(encryptedText, process.env.ENCRYPTION_KEY);
    return decrypted.toString(enc.Utf8);
}

// Check if caseID and password combo exists in the database
async function validateSignIn(user) {
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const caseIDQuery = {
        query: `SELECT * from c WHERE c.caseID = "${user.caseID}"`
    };

    const { resources: result } = await container.items
    .query(caseIDQuery)
    .fetchAll();

    if (result.length == 0) {
        return "USER DNE"
    }

    let decryptedPassword = decryptText(result[0].password)

    if (user.password === decryptedPassword) {
        return "SUCCESS"
    } else {
        return "INCORRECT PASSWORD"
    }
}