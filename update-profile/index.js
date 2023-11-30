const CosmosClient = require("@azure/cosmos").CosmosClient;
const { BlobServiceClient } = require('@azure/storage-blob');
var multipart = require('parse-multipart');

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "profiles",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

module.exports = async function (context, req) {
    const caseID = req.query.caseID
    const fileName = caseID + ".jpg"
    const id = await getID(caseID)

    let updatedProfile = {
        caseID: caseID,
        name: req.query.name,
        photo: "https://cwrumate72d1ab.blob.core.windows.net/cwru-mate-images/" + fileName,
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

    if (req.body && Object.keys(req.body).length !== 0) {
        var bodyBuffer = Buffer.from(req.body)
        var boundary = multipart.getBoundary(req.headers['content-type'])
        var parts = multipart.Parse(bodyBuffer, boundary)
        const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const container = "cwru-mate-images"
        const containerClient = await blobServiceClient.getContainerClient(container)
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        // Set the content type (MIME type) of the blob
        const contentType = 'image/jpeg'; // Set the appropriate content type for your image
        const options = { blobHTTPHeaders: { blobContentType: contentType } };
        const uploadBlobResponse = await blockBlobClient.upload(parts[0].data, parts[0].data.length, options);
    }

    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    context.log(`Deleting item with id: ${id} and caseID: ${caseID}`);
    await container.item(id, caseID).delete();

    let status = await createProfile(updatedProfile);
    
    let response = {
        resp : status
    }

    context.res = {
        status: 200, /* Defaults to 200 */
        body: response,
        headers: {   
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
        }
    };
}

async function getID(caseID) {
    // query to check if the caseID is already used
    const querySpec = {
        query: `SELECT * from c WHERE c.caseID = "${caseID}"`
    };
    const { resources: users } = await container.items
    .query(querySpec)
    .fetchAll();

    if (users.length == 1){
        return users[0].id
    }
    else {
        return "FAIL"
    }
}

async function createProfile(newUser) {
    const { resource: createdItem } = await container.items.create(newUser);
    return "SUCCESS"
}