//context.log('request made');
//const CosmosClient = require("@azure/cosmos").CosmosClient;

// const config_items = {
//     endpoint: process.env.COSMOS_ENDPOINT,
//     key: process.env.COSMOS_KEY,
//     databaseId: "cwru-mate",
//     containerId: "users",
//     partitionKey: { kind: "Hash", paths: ["/caseID"] }
//   };

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request to create a new user.');
    let name = req.query.name
    let caseID = req.query.caseID

    // let newUser = {
    //     name: name,
    //     caseID: caseID,
    //   }

    // inputing user data into the database
    //let entries = await createDocument(newUser);

    //var jsonArray = JSON.parse(JSON.stringify(entries))

    const responseMessage = "Your account has been created, " + name


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
