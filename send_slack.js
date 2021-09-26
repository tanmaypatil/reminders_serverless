const axios = require('axios').default;

function send_slack(message) {
  return new Promise((resolve, reject) => {
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
        resolve(response.status);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  })
}