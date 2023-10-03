const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "users",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

export function encryptText(text, key) {
    const encrypted = AES.encrypt(text, key);
    return encrypted.toString();
}

module.exports = async function (context, req) {
    log.console(req.query.password);
    let encryptedPassword = encryptText(req.query.password, process.env.ENCRYPTION_KEY);
    log.console(encryptedPassword);

    let newUser = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        caseID: req.query.caseID,
        birthday: req.query.birthday,
        password: encryptedPassword,
      }

    let status = await createUser(newUser);

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
async function createUser(newUser) {
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