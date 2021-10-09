var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for birthdays");

var params = {
    TableName: "birth_days",
    KeyConditionExpression: " #birth_date between :start_date and :end_date",
    ExpressionAttributeNames: {
        "#birth_date"  : "birth_date"
    },
    ExpressionAttributeValues: {
        ":start_date" : "19770101",
        ":end_date" : "20210101"
    }
};

(async function () {
    await query_emp(params);
})();


async function query_emp(params) {
    return new Promise((resolve, reject) => {
        docClient.query(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function (item) {
                    console.log(" -", item.person_name + ": " + item.birth_date);
                });
                resolve();
            }
        });
    });
}