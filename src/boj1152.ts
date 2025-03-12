var fs = require("fs");
const inputs:string = fs.readFileSync('./dev/stdin/inputs.txt').toString().trim();

if(!inputs){
    console.log(0);
}else{
    console.log(inputs.split(' ').length);
}


