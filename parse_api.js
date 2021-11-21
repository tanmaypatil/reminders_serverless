const querystring = require('querystring');

 let str = 'payload%3D%7B%22type%22%3A%22block_actions%22%2C%22user%22%3A%7B%22id%22%3A%22U02EY80NKAM%22%2C%22username%22%3A%22tany.patil77%22%2C%22name%22%3A%22tany.patil77%22%2C%22team_id%22%3A%22T02EGJSRSCD%22%7D%2C%22api_app_id%22%3A%22A02F90YP2JJ%22%2C%22token%22%3A%22pqCXZIRS34rO16EyPC21pb11%22%2C%22container%22%3A%7B%22channel_id%22%3A%22C02EKKDHGDQ%22%2C%22is_ephemeral%22%3Afalse%2C%22message_ts%22%3A%221637316446.000300%22%2C%22type%22%3A%22message%22%7D%2C%22trigger_id%22%3A%222736307461319.2492638876421.11197b633f183ad30ccd195b6ec1df14%22%2C%22team%22%3A%7B%22id%22%3A%22T02EGJSRSCD%22%2C%22domain%22%3A%22bills-yyp4270%22%7D%2C%22enterprise%22%3Anull%2C%22is_enterprise_install%22%3Afalse%2C%22channel%22%3A%7B%22id%22%3A%22C02EKKDHGDQ%22%2C%22name%22%3A%22bill-notification%22%7D%2C%22message%22%3A%7B%22type%22%3A%22message%22%2C%22subtype%22%3A%22bot_message%22%2C%22text%22%3A%22electricity%20bill%20for%20home%20due%20date%2009-11-2021%22%2C%22ts%22%3A%221637316446.000300%22%2C%22bot_id%22%3A%22B02FG7S88JJ%22%2C%22blocks%22%3A%5B%7B%22type%22%3A%22section%22%2C%22block_id%22%3A%22bgosB%22%2C%22fields%22%3A%5B%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22electricity%20bill%20for%20home%20due%20date%2009-11-2021%22%2C%22verbatim%22%3Afalse%7D%5D%7D%2C%7B%22type%22%3A%22actions%22%2C%22block_id%22%3A%22h%2BHx%22%2C%22elements%22%3A%5B%7B%22type%22%3A%22button%22%2C%22action_id%22%3A%22OihK7%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Paid%22%2C%22emoji%22%3Atrue%7D%2C%22style%22%3A%22primary%22%2C%22value%22%3A%22click_me_123%22%7D%2C%7B%22type%22%3A%22button%22%2C%22action_id%22%3A%22QZEAR%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Snooze%22%2C%22emoji%22%3Atrue%7D%2C%22style%22%3A%22danger%22%2C%22value%22%3A%22click_me_123%22%7D%5D%7D%5D%7D%2C%22state%22%3A%7B%22values%22%3A%7B%7D%7D%2C%22response_url%22%3A%22https%3A%5C%2F%5C%2Fhooks.slack.com%5C%2Factions%5C%2FT02EGJSRSCD%5C%2F2744245109494%5C%2FyP5LDPkhpxIAzFZhKBwRxOQy%22%2C%22actions%22%3A%5B%7B%22action_id%22%3A%22OihK7%22%2C%22block_id%22%3A%22h%2BHx%22%2C%22style%22%3A%22primary%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Paid%22%2C%22emoji%22%3Atrue%7D%2C%22type%22%3A%22button%22%2C%22value%22%3A%22click_me_123%22%2C%22action_ts%22%3A%221637397970.114601%22%7D%5D%7D';
// let x = querystring.unescape(str);
// let y = x.substr(8);
// console.log(y);
// let obj = JSON.parse(y);
// console.log(obj.type);

// let a = new URLSearchParams(str);
// for (let p of a) {
//     console.log(p);
//   }

//console.log(x);

//  let a = new URLSearchParams(str);
//  console.log(' datatype '+typeof a);
//  console.log('keys '+a.keys());
//  x = a.keys();
//  for ( z of x) {
//      console.log('key' + z);
//  }
// console.log(a.has('payload'));
// for (let o of a) {
//     console.log(o);
//     console.log(typeof o);
// }

function getUidOfAlarm(str) {
    let uid = null;
    let payload = querystring.unescape(str);
    let bare_payload = payload.substr(8);
    let obj = JSON.parse(bare_payload);
    let arr = obj.message.blocks;
    console.log('length '+arr.length);
    for ( ele of arr) {
        if(ele.type == 'actions') {
            let buttons = ele.elements;
            for(let b of buttons) {
                if ( b.text.text == 'Paid') {
                    uid = b.value;
                }
            }
        }
    }
    console.log('uid '+uid);
}



getUidOfAlarm(str);
