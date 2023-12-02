const CosmosClient = require("@azure/cosmos").CosmosClient;

const profiles_seen_config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "profiles-seen",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

const messages_config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "messages",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

module.exports = async function (context, req) {
    // userA and userB are caseIDs
    let swipe = {
        userA: req.query.userA,
        userB: req.query.userB,
        result: req.query.result
    }

    let swipe_status = await addSwipeResult(swipe);

    // after adding the swipe, check if userB has also swiped in userA

    if (isMutualSwipe(swipe)) {
        let message_status = await setUpMessages(swipe);
    }

    let response = {
        resp : swipe_status
    }

    context.res = {
        body: response,
        headers: {   
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Credentials' : true
        }
    };
}

async function isMutualSwipe(swipe) {
    const { endpoint, key, databaseId, containerId } = profiles_seen_config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const querySpec = {
        query: `SELECT * from c WHERE c.caseID = "${swipe.userB}"`
    };

    const { resources: users } = await container.items.query(querySpec).fetchAll();
    if (users.length > 0) return users[0].includes(userA)
    return false;
}

async function setUpMessages(swipe) {
    const { endpoint, key, databaseId, containerId } = messages_config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    new_chat = {
        participants: swipe.userA + "-" + swipe.userB,
        messages: [],
    }

    const { resource: updatedItem } = await container.items.upsert(new_chat);
}

async function addSwipeResult(swipe) {
    const { endpoint, key, databaseId, containerId } = profiles_seen_config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const querySpec = {
        query: `SELECT * from c WHERE c.caseID = "${swipe.userA}"`
    };

    const { resources: users } = await container.items.query(querySpec).fetchAll();

    let item;

    if (users.length == 0){
        item = {
            caseID: swipe.userA,
            yes: [],
            no: []
        }
    } else {
        item = users[0];
    }

    if (!addToSwipeList(item, swipe)) {
        return "ERROR";
    }

    const { resource: updatedItem } = await container.items.upsert(item);

    return "SUCCESS";
}

function addToSwipeList(item, swipe) {
    if (swipe.result === "YES") {
        item.yes.push(swipe.userB);
        return true;

    } else if (swipe.result === "NO") {
        item.no.push(swipe.userB);
        return true;

    } else {
        return false;
    }
}