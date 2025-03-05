"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const inputs = fs.readFileSync('./dev/stdn/inputs.txt').toString().split(' ');
const getInitCoord = () => { return { x: 0, y: 0 }; };
class Boj {
    constructor(currLoc, rightTopLoc, leftDownLoc) {
        this.currLoc = currLoc;
        this.rightTopLoc = rightTopLoc;
        this.leftDownLoc = leftDownLoc;
    }
    init(currLoc, rightTopLoc) {
        this.currLoc = currLoc;
        this.rightTopLoc = rightTopLoc;
    }
    transformTxt2Coord(txts) {
        const coords = new Array;
        coords.push({ x: Number(txts[0]), y: Number(txts[1]) });
        coords.push({ x: Number(txts[2]), y: Number(txts[3]) });
        return coords;
    }
    getMinDistInLine(start, curr, end) {
        return Math.min(Math.abs(curr - start), Math.abs(end - curr));
    }
    getExitMinDis() {
        return Math.min(this.getMinDistInLine(this.leftDownLoc.x, this.currLoc.x, this.rightTopLoc.x), this.getMinDistInLine(this.leftDownLoc.y, this.currLoc.y, this.rightTopLoc.y));
    }
}
const boj = new Boj(getInitCoord(), getInitCoord(), getInitCoord());
const coords = boj.transformTxt2Coord(inputs);
boj.init(coords[0], coords[1]);
console.log(boj.getExitMinDis());
