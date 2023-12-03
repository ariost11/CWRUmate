const { CosmosClient } = require('@azure/cosmos');

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
        text: req.query.text,
        date : req.query.date
    }

    let message_status = await sendMessage(message)

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
    try {
        const { endpoint, key, databaseId, containerId } = messages_config;
        const client = new CosmosClient({ endpoint, key });
        const database = client.database(databaseId);
        const container = database.container(containerId);

        const key1 = message.userA + "-" + message.userB;
        const key2 = message.userB + "-" + message.userA;

        const querySpec = {
            query: `SELECT * FROM c WHERE c.participants = "${key1}" OR c.participants = "${key2}"`
        };

        const { resources: chats } = await container.items.query(querySpec).fetchAll();

        let item = chats[0];

        const new_message = {
            sender: message.userA,
            text: message.text,
            date: message.date,
            count: item.messages.length + 1
        };

        item.messages.push(new_message);

        const { resource: updatedItem } = await container.items.upsert(item);

        return "SUCCESS";
    } catch (error) {
        console.error("Error in sendMessage:", error);
        return "FAILURE";
    }
}