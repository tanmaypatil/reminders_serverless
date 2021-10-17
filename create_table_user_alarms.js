var AWS = require("aws-sdk");
let util = require("./utils");
let endpoint = util.get_endpoint();


AWS.config.update({
    region: process.env.AWS_REGION ,
    endpoint: endpoint
});


function create_user_alarms() {
    return new Promise((resolve, reject) => {
        var dynamodb = new AWS.DynamoDB();
        var params = {
            TableName: "user_alarms",
            KeySchema: [
                { AttributeName: "alarm_type", KeyType: "HASH" },  //Partition key
                { AttributeName: "alarm_date", KeyType: "RANGE" }  //Sort key
            ],
            AttributeDefinitions: [
                { AttributeName: "alarm_type", AttributeType: "S" },
                { AttributeName: "alarm_date", AttributeType: "S" }

            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };

        dynamodb.createTable(params, function (err, data) {
            if (err) {
                console.error("Unable to create user_alarms table. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("Created table user_alarms. Table description JSON:", JSON.stringify(data, null, 2));
                resolve(data);
            }
        });
    });
}

module.exports =  {
    create_user_alarms : create_user_alarms
};