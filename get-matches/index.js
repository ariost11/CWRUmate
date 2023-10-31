const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "profiles-seen",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

module.exports = async function (context, req) {
    let caseID = req.query.caseID;

    let status = await getMatches(caseID);

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

async function getMatches(caseID) {
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const querySpec = {
        query: `SELECT * from c WHERE c.caseID = "${caseID}"`
    };

    const { resources: users } = await container.items.query(querySpec).fetchAll();

    let item;

    if (users.length == 0) {
        return "ERROR"
    }


    const { resource: updatedItem } = await container.items.upsert(item);

    return "SUCCESS";
}