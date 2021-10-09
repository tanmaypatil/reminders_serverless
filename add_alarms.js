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
                    "user_id": alarm.user_id,
                    "entity_id": alarm.entity_id,
                    "entity_type": alarm.entity_type
                }
            };

            if (alarm.entity_type === "alarm") {
                params.Item.alarm_type = alarm.alarm_type;
                params.Item.description = alarm.description;
                params.Item.next_date = alarm.next_date;
                params.Item.frequency = alarm.frequency;
                params.Item.reminder_date = alarm.reminder_date;
            }

            docClient.put(params, function (err, data) {
                if (err) {
                    console.error("Unable to add alarm", alarm.id, ". Error JSON:", JSON.stringify(err, null, 2));
                    reject();
                } else {
                    console.log("PutItem succeeded:", alarm.id);
                    resolve();
                }
            });
        });
    });
}