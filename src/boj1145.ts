var fs = require('fs');
const input = fs.readFileSync("/dev/stdin", "utf8").toString().trim().split(" ").map(numstr => parseInt(numstr, 10));

interface ICalc{
    arrCurrIdx: number;
    multinum: number;

    /**
     * 주어진 데이터로 초기화
     * */
    sort() : void;

    /**
     * print inputs
     * */
    printInputs() : void;

    /**
     * 정답 체크
     * */
    isAnswer(val: number): boolean;

    /**
     * 정답배열생성
     * */
    getAnswersArr(): number[];

    /**
     * 정답출력
     * */
    printAnswer(): void;

    /**
     * 모든 프로세스 실행
     * */
    run() : void;
}

class Calc implements ICalc{
    public initInput;
    public arrCurrIdx = 0;
    public multinum = 1;

    constructor(
        private inputs : Array<number>,
    ) {
    }

    sort(){
        this.inputs = this.inputs.sort();
    }

    printInputs(){
        console.log(`inputs : ${this.inputs}`);
    }

    getAnswersArr():number[]{
        return this.inputs.map(num => {
            let multinum = 1;
            while (true) {
                if (this.isAnswer(num * multinum)) {
                    return num * multinum;
                }
                multinum++;
            }
        })
    }

    isAnswer(val: number): boolean {
        return this.inputs.filter(input => val % input === 0).length > 2;
    }

    printAnswer() {
        console.log(Math.min(...this.getAnswersArr()));
    }

    run() {
        this.sort();
        // this.printInputs();
        this.printAnswer();
    }

}

const calc:ICalc = new Calc(input);
calc.run();


