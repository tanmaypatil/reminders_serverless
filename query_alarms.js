var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for leaves for employee e2 and type leave");

var params = {
    TableName: "leaves",
    KeyConditionExpression: "#id = :key",
    FilterExpression : "entity_type = :t",
    ExpressionAttributeNames: {
        "#id": "id"
    },
    ExpressionAttributeValues: {
        ":key": 'e2',
        ":t" : "leave"
    }
};

(async function () {
    await query_emp(params);
})();


async function query_emp(params) {
    return new Promise((resolve, reject) => {
        docClient.query(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function (item) {
                    console.log(" -", item.id + ": " + item.entity_id + ' type ' + item.entity_type);
                });
                resolve();
            }
        });
    });
}