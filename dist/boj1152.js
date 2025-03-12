var fs = require("fs");
const inputs = fs.readFileSync('./dev/stdin/inputs.txt').toString().trim();
if (!inputs) {
    console.log(0);
}
else {
    console.log(inputs.split(' ').length);
}
