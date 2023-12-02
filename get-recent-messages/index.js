const CosmosClient = require("@azure/cosmos").CosmosClient;

const messages_config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "messages",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const usersInfo = {
        userA: req.query.senderID, //sender
        userB: req.query.recieverID, //reciever
        count: req.query.count,
    }

    var response = {
        resp : await getMessages(usersInfo),
    };

    context.res = {
        body: response,
        headers: {   
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
        }
    };
}

async function getMessages(users) {
    const { endpoint, key, databaseId, containerId } = messages_config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const key1 = users.userA;
    const key2 = users.userB;
    const count = users.count;

    // query to check if the caseID is already used
    const querySpec = {
        query: `SELECT * FROM c WHERE (c.participants = "${key1}" OR c.participants = "${key2}")
            AND c.messages.count > ${count}`
    };
    const { resources: messages } = await container.items
    .query(querySpec)
    .fetchAll();

    return messages.messages;
}