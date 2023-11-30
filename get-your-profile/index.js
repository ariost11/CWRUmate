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

    let users = await getYourProfile(caseID);

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

async function getYourProfile(caseID) {
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const profilesContainer = database.container(containerId);

    // Get the current user from the profiles database
    const queryGetUserProfile = {
        query: `SELECT * from c WHERE c.caseID = "${caseID}"`
    };

    const { resources: userProfile } = await profilesContainer.items.query(queryGetUserProfile).fetchAll();

    if (userProfile.length == 0) {
        return "PROFILE NOT SET";
    }

    return userProfile[0]
}