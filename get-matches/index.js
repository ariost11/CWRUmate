const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "messages",
    containerId2: "profiles",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

const { endpoint, key, databaseId, containerId, containerId2 } = config;
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const messagesContainer = database.container(containerId);
const profilesContainer = database.container(containerId2);

module.exports = async function (context, req) {
    let caseID = req.query.caseID;

    let status = await getMessagePage(context, caseID);

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

async function getMessagePage(context, caseID) {

    const querySpec = {
        query: `SELECT * FROM c WHERE ARRAY_CONTAINS(c.participants, "${caseID}", true)`
    };

    const { resources: messages } = await messagesContainer.items.query(querySpec).fetchAll();

    context.log(messages);
}