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
const conversationContainer = database.container(containerId);
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

    const { resources: conversations } = await conversationContainer.items.query(querySpec).fetchAll();

    context.log(conversations);

    convoMsgHeaders = []

    for (let convo of conversations) {
        let otherUser = await getUser(convo, caseID);
        let otherCaseId = otherUser["caseID"];
        let name = otherUser["name"];
        let photo = otherUser["photo"];
        let lastMsg = convo["messages"].slice(-1)[0];

        convoMsgHeaders.push({
            "caseID": otherCaseId,
            "name": name,
            "photo": photo,
            "lastMsg": lastMsg
        });
    }

    return convoMsgHeaders;
}

async function getUser(convo, caseID) {

    let otherCaseId;

    for (let id of convo["participants"]) {
        if (id !== caseID) {
            otherCaseId = id;
        }
    }

    const querySpec = {
        query: `SELECT * from c WHERE c.caseID = "${caseID}"`
    };

    const { resources: users } = await profilesContainer.items.query(querySpec).fetchAll();

    let otherUser = users[0];

    return otherUser;
}