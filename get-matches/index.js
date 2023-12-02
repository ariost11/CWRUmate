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

    let status = await getMessageHeaders(context, caseID);

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

async function getMessageHeaders(context, caseID) {

    const querySpec = {
        query: `SELECT * FROM c WHERE c.participants LIKE "%${caseID}%"`
    };

    const { resources: conversations } = await conversationContainer.items.query(querySpec).fetchAll();

    convoMsgHeaders = []

    for (let convo of conversations) {
        let otherUser = await getUser(convo, caseID);
        let otherCaseId = otherUser.caseID;
        let name = otherUser.name;
        let photo = otherUser.photo;

        // check if last message exists
        let msgsLen = convo.messages.length;

        let lastMsg = "";

        if (msgsLen != 0) {
            lastMsg = convo.messages[msgsLen-1].text;
        }

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

    let usersList = convo["participants"].split("-");

    for (let id of usersList) {
        if (id !== caseID) {
            otherCaseId = id;
            break;
        }
    }

    const querySpec = {
        query: `SELECT * from c WHERE c.caseID = "${otherCaseId}"`
    };

    const { resources: users } = await profilesContainer.items.query(querySpec).fetchAll();

    let otherUser = users[0];

    return otherUser;
}