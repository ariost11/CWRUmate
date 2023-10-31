const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "profiles",
    containerId2: "profiles-seen",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

module.exports = async function (context, req) {
    let caseID = req.query.caseID
    let users = await getPotentialMatches(context, caseID);
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

async function getPotentialMatches(context, caseID) {
    const { endpoint, key, databaseId, containerId, containerId2 } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const profilesContainer = database.container(containerId);
    const profilesSeenContainer  = database.container(containerId2)

    // Get the current user from the profiles database
    const queryGetUserProfile = {
        query: `SELECT * from c WHERE c.caseID = "${caseID}"`
    };

    const { resources: userProfile } = await profilesContainer.items.query(queryGetUserProfile).fetchAll();

    if (userProfile.length == 0) {
        return "PROFILE NOT SET";
    }

    const userA = userProfile[0];

    // Get list of users that have already been swiped on 
    const queryGetUserProfilesSeen = {
        query: `SELECT * from c WHERE c.caseID = "${caseID}"`
    }

    const { resources: userFromProfilesSeen } = await profilesSeenContainer.items.query(queryGetUserProfilesSeen).fetchAll();

    let seenProfiles = [];

    if (userFromProfilesSeen.length != 0) {
        seenProfiles = [...userFromProfilesSeen[0].yes, ...userFromProfilesSeen[0].no];
    }

    // Get potential matches
    const queryGetMatches = {
        query: `SELECT * from c WHERE c.caseID <> "${caseID}"`
    };

    const { resources: matches } = await profilesContainer.items.query(queryGetMatches).fetchAll();

    // List of users that have NOT been swiped on yet
    const filteredUsers = matches.filter(userB => !seenProfiles.includes(userB.caseID) && 
                                                    userA.gender_preferences.includes(userB.gender_identity) && 
                                                    userB.gender_preferences.includes(userA.gender_identity));

    return filteredUsers;
}