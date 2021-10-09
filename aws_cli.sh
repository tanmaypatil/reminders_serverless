aws dynamodb get-item --consistent-read --table-name leaves --key '{ "id": {"S": "e2" }, "entity_id": {"S": "e2"}}' --endpoint-url "http://localhost:8000"
-- query using key of the table.
aws dynamodb get-item --consistent-read --table-name user_alarms --key '{ "user_id": {"S": "u1" }, "entity_id": {"S": "u1"}}' --endpoint-url "http://localhost:8000"
aws dynamodb get-item --consistent-read --table-name user_alarms --key '{ "user_id": {"S": "u1" }, "entity_id": {"S": "a1"}}' --endpoint-url "http://localhost:8000"

-- create a global secondary index on reminder_date column 
aws dynamodb update-table \
    --table-name user_alarms \
    --attribute-definitions '[
      {
          "AttributeName": "reminder_date",
          "AttributeType": "S"
      }
    ]' \
    --global-secondary-index-updates '[
        {
            "Create": {
                "IndexName": "reminder_index",
                "KeySchema": [
                    {
                        "AttributeName": "reminder_date",
                        "KeyType": "HASH"
                    }
                ],
                "Projection": {
                    "ProjectionType": "ALL"
                },
                "ProvisionedThroughput": {
                    "ReadCapacityUnits": 1,
                    "WriteCapacityUnits": 1
                }
            }
        }
    ]' \
    --endpoint-url "http://localhost:8000"

--- querying based on reminder_date 
aws dynamodb query \
    --table-name user_alarms  \
    --index-name reminder_index \ 
    --key-condition-expression "reminder_date GT :reminder_date" \
    --expression-attribute-values '{ 
        ":reminder_date": { "S": "20210915" }
    }' \
--endpoint-url "http://localhost:8000"


aws dynamodb query \
    --table-name user_alarms \
    --index-name reminder_index \ 
    --key-conditions '{
        "reminder_date":{
            "ComparisonOperator":"GT",
            "AttributeValueList": [ {"S": "20210915"} ]
        }
    }' \
--endpoint-url "http://localhost:8000"


aws dynamodb update-table \
    --table-name user_alarms \
    --attribute-definitions '[
         {
          "AttributeName": "user_id",
          "AttributeType": "S"
      },
      {
          "AttributeName": "reminder_date",
          "AttributeType": "S"
      }
    ]' \
    --global-secondary-index-updates '[
        {
            "Create": {
                "IndexName": "remind_index",
                "KeySchema": [
                    {
                        "AttributeName": "user_id",
                        "KeyType": "HASH"
                    },
                    {
                        "AttributeName": "reminder_date",
                        "KeyType": "RANGE"
                    }
                ],
                "Projection": {
                    "ProjectionType": "ALL"
                },
                "ProvisionedThroughput": {
                    "ReadCapacityUnits": 1,
                    "WriteCapacityUnits": 1
                }
            }
        }
    ]' \
    --endpoint-url "http://localhost:8000"


aws dynamodb query \
    --table-name user_alarms  \
    --index-name remind_index \ 
    --key-condition-expression "reminder_date GT :reminder_date" \
    --expression-attribute-values '{ 
        ":reminder_date": { "S": "20210915" }
    }' \
--endpoint-url "http://localhost:8000"



-- create table birth_days
aws dynamodb create-table \
    --table-name birth_days \
    --attribute-definitions AttributeName=person_name,AttributeType=S AttributeName=birth_date,AttributeType=S \
    --key-schema AttributeName=person_name,KeyType=HASH AttributeName=birth_date,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --tags Key=Owner,Value=Tanmay
    --endpoint-url "http://localhost:8000"

    aws dynamodb put-item \
    --table-name birth_days \
    --item file://birthdays.json \
    --return-consumed-capacity TOTAL \
    --return-item-collection-metrics SIZE
    --endpoint-url "http://localhost:8000"


    aws dynamodb query \
    --table-name birth_days \
    --key-condition-expression "person_name = :v1" \
    --expression-attribute-values ' { ":v1" : {"S" : "Tanmay" } }' \
    --endpoint-url "http://localhost:8000"


    aws dynamodb delete-table \
    --table-name birth_days \
    --endpoint-url "http://localhost:8000"

   aws dynamodb query \
    --table-name birth_days \
    --key-condition-expression "birth_date = :v1" \
    --expression-attribute-values ' { ":v1" : {"S" : "19881212" } }' \
    --endpoint-url "http://localhost:8000"


aws dynamodb update-table \
    --table-name birth_days \
    --attribute-definitions '[
         {
          "AttributeName": "person_name",
          "AttributeType": "S"
      },
      {
          "AttributeName": "birth_date",
          "AttributeType": "S"
      }
    ]' \
    --global-secondary-index-updates '[
        {
            "Create": {
                "IndexName": "birth_index",
                "KeySchema": [
                    {
                        "AttributeName": "person_name",
                        "KeyType": "HASH"
                    },
                    {
                        "AttributeName": "birth_date",
                        "KeyType": "RANGE"
                    }
                ],
                "Projection": {
                    "ProjectionType": "ALL"
                },
                "ProvisionedThroughput": {
                    "ReadCapacityUnits": 1,
                    "WriteCapacityUnits": 1
                }
            }
        }
    ]' \
    --endpoint-url "http://localhost:8000"


    aws dynamodb query \
    --table-name birth_days  \
    --index-name birth_index \ 
    --key-condition-expression "person_name = :person_name  AND  birth_date BETWEEN  :start_date" \
    --expression-attribute-values '{ 
        ":person_name" : { "S" : "Tanmay" },
        ":reminder_date": { "S": "20210915" }
    }' \
--endpoint-url "http://localhost:8000"




