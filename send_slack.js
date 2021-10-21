const axios = require('axios').default;
require('dotenv').config();

function send_slack(message) {
  console.log('send_slack ' + message);
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
           "value": "click_me_123"
         },
         {
           "type": "button",
           "text": {
             "type": "plain_text",
             "emoji": true,
             "text": "Snooze"
           },
           "style": "danger",
           "value": "click_me_123"
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