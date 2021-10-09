var AWS = require("aws-sdk");
let slack = require('./send_slack');


AWS.config.update({
    region: "ap-south-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for alarms");

var params = {
    TableName: "user_alarms",
    KeyConditionExpression: "#alarm_type = :key",
    ExpressionAttributeNames: {
        "#alarm_type": "alarm_type"
    },
    ExpressionAttributeValues: {
        ":key": 'alarm',
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


async function query_alarm(params) {
    return new Promise((resolve, reject) => {
        docClient.query(params, function (err, data) {

            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                //var arr = [];
                data.Items.forEach(function (item) {
                    console.log(" -", item.user_id + ": " + item.entity_id + ' type ' + item.entity_type);
                    console.log(" next_date " + item.next_date);
                    console.log(" description " + item.description);
                    //arr.push(item);
                });
                resolve(data.Items);
            }
        });
    });
}
