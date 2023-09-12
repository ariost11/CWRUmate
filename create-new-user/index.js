module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request to create a new user.');
    let name = req.query.name
    let caseID = req.query.caseID

    const responseMessage = "Your account has been created, " + name


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
