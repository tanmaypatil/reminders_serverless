var alarm = require('./send_alarms');
exports.handler =  async function(event, context) {
    console.log(` start execution of lambda ${context.functionName}`);
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    await alarm.send_alarms();
    return context.logStreamName
  }