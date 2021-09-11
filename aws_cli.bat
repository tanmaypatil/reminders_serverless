aws dynamodb get-item --consistent-read --table-name leaves --key '{ "id": {"S": "e2" }, "entity_id": {"S": "e2"}}'
aws sts get-caller-identity