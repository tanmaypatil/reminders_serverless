const axios = require('axios').default;
require('dotenv').config();

function send_slack(message,entity_id) {
  let button_action = entity_id + '|done';
  console.log('send_slack ' + message + 'button_action : '+button_action);
  axios.post(process.env.SLACK_ENDPOINT, {
    text: message,
    "blocks": [
      {
       "type": "section",
       "fields": [
         {
           "type": "mrkdwn",
           "text":  message
         }
       ]
     },
      {
       "type": "actions",
       "elements": [
                 
         {
           "type": "button",
           "text": {
             "type": "plain_text",
             "emoji": true,
             "text": "Paid"
           },
           "style": "primary",
           "value":  button_action
         },
         {
           "type": "button",
           "text": {
             "type": "plain_text",
             "emoji": true,
             "text": "Snooze"
           },
           "style": "danger",
           "value": "snooze|snooze"
         }
       ]
     }
     ]
    ,
      headers: { 'Content-type': 'application/json' }}
    
  )
    .then(function (response) {
      console.log('send_slack success ' + response.statusText);
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = {
  send_slack: send_slack
};