var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "ap-south-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing birth day list into DynamoDB. Please wait.");

var allBirth = JSON.parse(fs.readFileSync('birthday_list.json', 'utf8'));
allBirth.forEach(function(bd) {
    var params = {
        TableName: "birth_days",
        Item: {
            "person_name":  bd.person_name,
            "birth_date": bd.birth_date,
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", bd.person_name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", bd.person_name);
       }
    });
});