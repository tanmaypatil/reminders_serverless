var AWS = require("aws-sdk");

function delete_table(table_name) {
    return new Promise((resolve, reject) => {
        let  dynamodb = new AWS.DynamoDB();
        console.log("deleting the " + table_name + " table - removing all data");
        let  params = {
            TableName: table_name
        };
        dynamodb.deleteTable(params, function (err, data) {
            if (err) {
                console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
                resolve();
            }
        });
    })
}

module.exports = {
    delete_table : delete_table
}