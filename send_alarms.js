var AWS = require("aws-sdk");
let slack = require('./send_slack');
let date_util = require('./date_util');


AWS.config.update({
    region: "ap-south-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for alarms");

function send_alarms() {
    let input_date = date_util.getTodaysDate();
    console.log('todays date '+input_date);
    var params = {
        TableName: "user_alarms",
        KeyConditionExpression: "#alarm_type = :key and #alarm_date <= :alarm_date ",
        ExpressionAttributeNames: {
            "#alarm_type": "alarm_type",
            "#alarm_date": "alarm_date"
        },
        ExpressionAttributeValues: {
            ":key": 'reminder',
            ":alarm_date": input_date
        }
    };

    (async function () {
        try {
            let arr = await query_alarm(params);
            await slack.send_slack(arr[0].description);
        }
        catch (err) {
            console.log(err.response.status);
            console.log(err.response.statusText);
        }
    })();

}
async function query_alarm(params) {
    return new Promise((resolve, reject) => {
        docClient.query(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                //var arr = [];
                data.Items.forEach(function (item) {
                    console.log(" -", item.user_id + ": " + item.entity_id);
                    console.log(" next_date " + item.alarm_date);
                    console.log(" description " + item.description);
                    //arr.push(item);
                });
                resolve(data.Items);
            }
        });
    });
}
