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
    let users = await getPotentialMatches(caseID, context);
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

async function getPotentialMatches(caseID, context) {
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const queryGetUser = {
        query: `SELECT * from c WHERE c.caseID = "${caseID}"`
    };
    const { resources: user } = await container.items
    .query(queryGetUser)
    .fetchAll();

    const queryGetMatches = {
        query: `SELECT * from c WHERE c.caseID <> "${caseID}"`
    };
    const { resources: matches } = await container.items
    .query(queryGetMatches)
    .fetchAll();
    context.log(user[0].gender_preferences)

    const userA = user[0]
    const filteredUsers = matches.filter(userB => userA.gender_preferences.includes(userB.gender_identity) && userB.gender_preferences.includes(userA.gender_identity))
    return filteredUsers
}