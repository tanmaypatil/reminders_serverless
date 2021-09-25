var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

(async function() {
await delete_leaves();
await import_leaves();
})();


function delete_leaves() {
    return new Promise((resolve, reject) => {
        var dynamodb = new AWS.DynamoDB();
        console.log("deleting the leaves table - removing all data");
        var params = {
            TableName: "leaves"
        };
        dynamodb.deleteTable(params, function (err, data) {
            if (err) {
                console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
                resolve();
            }
        });
    })
}


function import_leaves() {
    console.log("Importing leaves into DynamoDB. Please wait.");
    return new Promise((resolve, reject) => {
        let leaves = JSON.parse(fs.readFileSync('leaves.json', 'utf8'));
        leaves.forEach(function (leave) {
            let params = {
                TableName: "leaves",
                Item: {
                    "id": leave.id,
                    "entity_id": leave.entity_id,
                    "entity_type": leave.entity_type
                }
            };

            if (leave.entity_type === "leave") {
                params.Item.from_date = leave.from_date;
                params.Item.to_date = leave.to_date;
            }

            docClient.put(params, function (err, data) {
                if (err) {
                    console.error("Unable to add leave", leave.id, ". Error JSON:", JSON.stringify(err, null, 2));
                    reject();
                } else {
                    console.log("PutItem succeeded:", leave.id);
                    resolve();
                }
            });
        });
    });
}