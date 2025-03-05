const { log } = require('console');
const fs = require('fs');
const inputs = fs.readFileSync("./dev/stdn/inputs.txt").toString().split("\n");
inputs.forEach(input => console.log(input));
