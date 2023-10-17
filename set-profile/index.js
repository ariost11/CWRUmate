const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "profiles",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

module.exports = async function (context, req) {

    let newProfile = {
        caseID: req.query.caseID,
        name: req.query.name,
        photo: req.query.photo,
        birthday: req.query.birthday,
        year: req.query.year,
        bio: req.query.bio,
        gender_identity: req.query.gender_identity,
        gender_preferences: req.query.gender_preferences.split(","),
        majors: req.query.majors.split(","),
        clubs: req.query.clubs.split(","),
        ideal_date: req.query.ideal_date,
        looking_for: req.query.looking_for.split(","),
        political_leaning: req.query.political_leaning,
        apple_android: req.query.apple_android,
        religion: req.query.religion,
        mothers_maiden_name: req.query.mothers_maiden_name,
        passphrase: req.query.passphrase,
        tink: req.query.tink,
        study_spot: req.query.study_spot,
        season: req.query.season,
      }

    let status = await createProfile(newProfile);

    let response = {
        resp : status
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response,
        headers: {   
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Credentials' : true
        }
    };
}

  // inserting the user data into the database
async function createProfile(newUser) {
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    // query to check if the caseID is already used
    const querySpec = {
        query: `SELECT * from c WHERE c.caseID = "${newUser.caseID}"`
    };
    const { resources: users } = await container.items
    .query(querySpec)
    .fetchAll();

    if (users.length == 0){
        const { resource: createdItem } = await container.items.create(newUser);
        return "SUCCESS"
    }
    else {
        return "FAIL"
    }

}