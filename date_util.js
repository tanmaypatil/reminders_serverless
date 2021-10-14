
var add = require('date-fns/add');
var format = require('date-fns/format')

function getTodaysDate() {
    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();

    let str = y.toString() + m.toString() + day.toString();
    console.log(str);
    return str;
}


function addDuration(durationType , duration ) {
    let d = new Date();
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

let out_str = addDuration('Month',2);
console.log(' out_str : '+out_str);

module.exports = {
    getTodaysDate : getTodaysDate,
    addDuration :  addDuration
}