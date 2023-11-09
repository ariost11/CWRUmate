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

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

module.exports = async function (context, req) {
    const caseID = req.query.caseID

    // upload image with caseID as image name
    var bodyBuffer = Buffer.from(req.body)
    var boundary = multipart.getBoundary(req.headers['content-type'])
    var parts = multipart.Parse(bodyBuffer, boundary)
    const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const container = "cwru-mate-images"
    const containerClient = await blobServiceClient.getContainerClient(container)
    const fileName = caseID + ".jpg"
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    // Set the content type (MIME type) of the blob
    const contentType = 'image/jpeg'; // Set the appropriate content type for your image
    const options = { blobHTTPHeaders: { blobContentType: contentType } };
    const uploadBlobResponse = await blockBlobClient.upload(parts[0].data, parts[0].data.length, options);

    let newProfile = {
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

    let status = await createProfile(newProfile);
    
    let response = {
        resp : status
    }

    /* for debugging:
    let response = {
        name : parts[0].filename,
        type : parts[0].type,
        data : parts[0].data.length
    }
    */

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

async function uploadBlobFromBuffer(containerClient, blobName, buffer) {

    // Create blob client from container client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
    // Upload buffer
    await blockBlobClient.uploadData(buffer);
  }