function getTodaysDate() {
    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();

    let str = y.toString() + m.toString() + day.toString();
    console.log(str);
    return str;
}

module.exports = {
    getTodaysDate : getTodaysDate
}