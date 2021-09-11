var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing leaves into DynamoDB. Please wait.");

let leaves = JSON.parse(fs.readFileSync('leaves.json', 'utf8'));
leaves.forEach(function(leave) {
    let params = {
        TableName: "leaves",
        Item: {
            "id":  leave.id,
            "entity_id": leave.entity_id,
            "entity_type":  leave.entity_type
        }
    };

    if ( leave.entity_type === "leave") {
        params.Item.from_date = leave.from_date ;
        params.Item.to_date = leave.to_date;
    }

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add leave", leave.id, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", leave.id);
       }
    });
});