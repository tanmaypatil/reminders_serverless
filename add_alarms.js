var AWS = require("aws-sdk");
var fs = require('fs');
let util = require("./utils");
let create_table = require('./create_table_user_alarms');

AWS.config.update({
    region: "ap-south-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

(async function() {
await util.delete_table("user_alarms");
await create_table.create_user_alarms();
await import_alarms();
})();


function import_alarms() {
    console.log("Importing alarms into DynamoDB. Please wait.");
    return new Promise((resolve, reject) => {
        let alarms = JSON.parse(fs.readFileSync('user_alarms.json', 'utf8'));
        alarms.forEach(function (alarm) {
            let params = {
                TableName: "user_alarms",
                Item: {
                    "alarm_type": alarm.alarm_type,
                    "alarm_date": alarm.alarm_date,
                    "user_id": alarm.user_id,
                    "entity_id": alarm.entity_id
                }
            };

            if (alarm.alarm_type === "reminder") {
                console.log('adding alarm '+alarm.description);
                params.Item.description = alarm.description;
                params.Item.frequency = alarm.frequency;
                params.Item.day = alarm.day;
            }

            docClient.put(params, function (err, data) {
                if (err) {
                    console.error("Unable to add alarm", alarm.entity_id, ". Error JSON:", JSON.stringify(err, null, 2));
                    reject();
                } else {
                    console.log("PutItem succeeded:", alarm.entity_id);
                    resolve();
                }
            });
        });
    });
}