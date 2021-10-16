
var add = require('date-fns/add');
var format = require('date-fns/format');
var parse = require('date-fns/parse');

function getTodaysDate() {
    let d = new Date();
    str = format(d,'yyyyMMdd');
    console.log(str);
    return str;
}


function addDuration(durationType , duration ,contextDate ) {
    // context date is not given , assume todays date.
    let d = contextDate ? parse(contextDate,'yyyyMMdd',new Date()) : new Date();
    durationObj = {};
    switch(durationType) {
        case 'Months':
        case 'Month' :
            durationObj.months = duration;
            break;
        case 'Days' :
        case 'Day' :
            durationObj.days = duration;
            break;
        default : 
            durationObj.months = duration;
    }
    let out = add(d,durationObj);
    console.log("output date "+ out);
    let out_str = format(out,'yyyyMMdd');
    //console.log('out_str  : '+out_str);
    return out_str;
}
/*
let out_str = addDuration('Month',2);
console.log(' out_str : '+out_str);
out_str = getTodaysDate();
console.log('todays date '+out_str);
let x = parse('20211017', 'yyyyMMdd', new Date());
console.log('parsed date '+x);

let y = addDuration('Month',1,'20211017');
console.log(' after adding month - y is '+y);
*/

module.exports = {
    getTodaysDate : getTodaysDate,
    addDuration :  addDuration
}