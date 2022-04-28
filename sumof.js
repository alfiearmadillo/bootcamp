//sumof
const is_number = require("is-number")


class testing {
    sumof(a,b){
    if(is_number(a) && is_number(b)) {
        return a+b
    } else {
        return "nice try"
    }
}

}




//console.log(Math.sqrt(-1))





//console.log(sum((Math.floor(Math.random() * 100)),(Math.floor(Math.random() * 100))));
module.exports = testing