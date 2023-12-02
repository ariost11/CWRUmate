const messages_config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "messages",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

module.exports = async function (context, req) {
    // here, the sender is userA
    let message = {
        userA: req.query.userA,
        userB: req.query.userB,
        text: req.query.text
    }

    let message_status = sendMessage(message)

    let response = {
        resp : message_status
    }

    context.res = {
        body: response,
        headers: {   
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Credentials' : true
        }
    };
}

async function sendMessage(message) {
    const { endpoint, key, databaseId, containerId } = messages_config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const querySpec = {
        query: `SELECT * FROM c WHERE ARRAY_CONTAINS("${message.userA}", c.participants) AND ARRAY_CONTAINS("${message.userA}", c.participants)`
    };

    const { resources: users } = await container.items.query(querySpec).fetchAll();

    return users

    /*

    new_message = {
        sender: message.userA,
        text: message.text
    }

    const { resource: updatedItem } = await container.items.upsert(new_chat);
    */
}