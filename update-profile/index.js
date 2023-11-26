const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "profiles",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
};

module.exports = async function (context, req) {

    
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