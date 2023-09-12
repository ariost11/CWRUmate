const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "cwru-mate",
    containerId: "users",
    partitionKey: { kind: "Hash", paths: ["/caseID"] }
  };

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request to create a new user.');
    let name = req.query.name
    let caseID = req.query.caseID

    let newUser = {
        name: name,
        caseID: caseID,
      }

    let entries = await createDocument(newUser);

    //const responseMessage = "Your account has been created, " + name

    var jsonArray = JSON.parse(JSON.stringify(entries))


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: jsonArray
    };
}

// function to create new database of it does not exist already
async function create(client, databaseId, containerId) {
    const partitionKey = config.partitionKey;
    const { database } = await client.databases.createIfNotExists({
      id: databaseId
    });
    console.log(`Created database:\n${database.id}\n`);
    const { container } = await client
      .database(databaseId)
      .containers.createIfNotExists(
        { id: containerId, partitionKey },
        { offerThroughput: 400 }
      );
  
    console.log(`Created container:\n${container.id}\n`);
  }

  // inserting the user data into the database
async function createDocument(newItem) {
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);
    await create(client, databaseId, containerId);
    const { resource: createdItem } = await container.items.create(newItem);
  
    // query to return all items
    const querySpec = {
      query: "SELECT * from c"
    };
  
    // read all items in the items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();
  
    return items;
  }