var AWS = require("aws-sdk");
const https = require('https');



AWS.config.update({
    region: "ap-south-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for alarms for user u1 and type alarm");

var params = {
    TableName: "user_alarms",
    KeyConditionExpression: "#user_id = :key",
    FilterExpression: "entity_type = :t",
    ExpressionAttributeNames: {
        "#user_id": "user_id"
    },
    ExpressionAttributeValues: {
        ":key": 'u1',
        ":t": "alarm"
    }
};

(async function () {
    let arr = await query_alarm(params);
    await send_slack(arr[0]);

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


async function send_slack(item) {
    const body = { text: item.description };


}



