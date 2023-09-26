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

    if (result[0].password === user.password) {
        return "SUCCESS"
    } else {
        return "INCORRECT PASSWORD"
    }
}