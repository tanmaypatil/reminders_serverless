var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "leaves",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},  //Partition key
        { AttributeName: "entity_id", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "entity_id", AttributeType: "S" }
      
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create leaves table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table leave. Table description JSON:", JSON.stringify(data, null, 2));
    }
});