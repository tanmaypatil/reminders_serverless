var AWS = require("aws-sdk");
let slack = require('./send_slack');
let date_util = require('./date_util');
let insert_util = require('./move_dates');
let util = require("./utils");
let endpoint = util.get_endpoint();

AWS.config.update({
    region: process.env.AWS_REGION,
    endpoint: endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient();


async function send_alarms() {
    console.log("send_alarms : Querying for alarms");
    let input_date = date_util.getTodaysDate();
    console.log('send_alarms : todays date ' + input_date);
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
    try {
        let arr = await query_alarm(params);
        if (arr)
           console.log('send_alarms : query alarms completed %d', arr.length);
        for (let a of arr) {
            let dueDate = date_util.formattedDate(a.alarm_date);
            let desc = a.description + ' due date ' + dueDate;
            await slack.send_slack(desc,a.entity_id);
            await insert_util.insertAlarm(a);
        }
    }
    catch (err) {
        console.log(err.response.status);
        console.log(err.response.statusText);
    }


}

async function query_alarm(params) {
    return new Promise((resolve, reject) => {
        docClient.query(params, function (err, data) {
            if (err) {
                console.error("query_alarm : Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("query_alarm : Query succeeded.");
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


module.exports = {
    send_alarms : send_alarms
}

send_alarms();
