var bigInt = require("big-integer");
var memo = [];
function fiborecursivo(n){
    if(n==0 || n==1){
        return bigInt.one;
    }else{
        if(memo[n]!=-1) return memo[n];
        memo[n] = fiborecursivo(n-1).add(fiborecursivo(n-2));
        return memo[n];
    }
}
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let nth = req.body.nth
    let nth_1 = bigInt.one;
    let nth_2 = bigInt.zero;
    let answer = bigInt.zero;
    if (nth < 0)
        throw 'must be greater than 0'
    else if (nth === 0)
        answer = nth_2
    else if (nth === 1)
        answer = nth_1
    else {
        for(var i=0;i<nth+1;i++){
            memo.push(-1);
        }
        answer = fiborecursivo(nth);
    }

    context.res = {
        body: answer.toString()
    };
}