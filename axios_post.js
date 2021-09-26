const axios = require('axios').default;

axios.post('https://hooks.slack.com/services/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', {
    text: 'from axios-second message'
  },
  {
    headers: {'Content-type': 'application/json'},
  }
  )
  .then(function (response) {
    console.log(response.statusText);
    console.log(response.status);
  })
  .catch(function (error) {
    console.log(error);
  })