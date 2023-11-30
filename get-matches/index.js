const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "profiles-seen",
    containerId2: "messages",
    containerId3: "profiles",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

const { endpoint, key, databaseId, containerId, containerId2, containerId3 } = config;
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const profilesSeenContainer = database.container(containerId);
const messagesContainer = database.container(containerId2);
const profilesContainer = database.container(containerId3);

module.exports = async function (context, req) {
    let caseID = req.query.caseID;

    let status = await getMessagePage(caseID);

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

async function getMessagePage(caseID) {

    let messageHeaders = []
    const matches = getMatches(caseID);

    for (let i = 0; i < matches.length; i++) {
        let caseID2 = matches[i].caseID;
        let key = getMessagesKey(caseID, caseID2);
        
        const querySpec = {
            query: `SELECT * from c WHERE c.key = "${key}"`
        };

        const { resources: messages } = await messagesContainer.items.query(querySpec).fetchAll();
    
        if (messages.length == 0) {
            const item = {
                key: key,
                messages: []
            }
    
            await messagesContainer.items.upsert(item);

            continue;
        }

        let messageHeader = await getMessageHeader(messages, caseID2);
        messageHeaders.push(messageHeader);
    }
}

async function getMessageHeader(messages, caseID) {
    const querySpec = {
        query: `SELECT * from c WHERE c.caseID = "${caseID}"`
    };

    const { resources: user } = await profilesContainer.items.query(querySpec).fetchAll();

    const userA = user[0];

    let lastMsg = messages.messages[messages.messages.length-1];

    let response = {
        name: userA.name,
        picture: userA.profile_picture, // check this
        last_msg: last.msg,
        from: last.from,
        unread: last.unread
    }

    return response; 
}

function getMessagesKey(caseID, caseID2) {
    if (caseID.localeCompare(caseID2) < 0) {
        return caseID + "-" + caseID2;
    } else {
        return caseID2 + "-" + caseID;
    }   
}

async function getMatches(caseID) {

    let matches = [];
    const yesList = getYesList(caseID);

    for (let i = 0; i < yesList.length; i++) {
        let caseID2 = yesList[i].caseID;
        let yesListB = getYesList(caseID2);
        
        if (yesListB.includes(caseID)) {
            matches.push(caseID2);
        }
    }

    return matches;
}

async function getYesList(caseID) {
    const querySpec = {
        query: `SELECT * from c WHERE c.caseID = "${caseID}"`
    };

    const { resources: users } = await profilesSeenContainer.items.query(querySpec).fetchAll();

    return users[0].yes;
}