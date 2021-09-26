var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for leaves for employee e2.");

var params = {
    TableName: "leaves",
    KeyConditionExpression: "#id = :key",
    ExpressionAttributeNames: {
        "#id": "id"
    },
    ExpressionAttributeValues: {
        ":key": 'e2'
    }
};