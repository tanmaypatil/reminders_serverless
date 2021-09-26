const axios = require('axios').default;

function send_slack(message) {

  console.log('send_slack ' + message);
  axios.post('https://hooks.slack.com/services/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', {
    text: message
  },
    {
      headers: { 'Content-type': 'application/json' },
    }
  )
    .then(function (response) {
      console.log(response.statusText);
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = {
  send_slack: send_slack
};