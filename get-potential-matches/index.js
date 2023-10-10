const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "profiles",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

module.exports = async function (context, req) {
    let caseID = req.query.caseID
    let users = await getPotentialMatches(caseID);
    let response = {
        resp : users
    }
    context.res = {
        body: response,
        headers: {   
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Credentials' : true
        }
    };
}

async function getPotentialMatches(caseID) {
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    // query to check if the caseID is already used
    const querySpec = {
        query: `SELECT * from c WHERE c.caseID <> "${caseID}"`
    };
    const { resources: users } = await container.items
    .query(querySpec)
    .fetchAll();
    return users
}