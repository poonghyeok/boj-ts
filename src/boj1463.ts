var fs = require('fs');
var args:number[] = fs.readFileSync('./input.txt', 'utf8').toString().trim().split(" ").map(input => parseInt(input));

interface RetNRest {
  ret: number;
  rest: number;
}

interface IBoj1463 {
  /**
   * 정답 수
   * */
  goal: number;
  /**
   * 연산 수
   * */
  ans: number;
  /**
   * 숫자를 만들려면 N은 최대 몇제곱까지 쓸 수 있는지
   * 즉, 주어진 수는 N의 몇제곱보다 큰 지 구한다.
   * */
  getMaxNumByNsquare(targetNum: number, squareNum: number): number
  /**
   * 2와 3으로 더 이상 나누어지지 않는 수를 만들기 위한 최적의 연산 횟수를 찾는다.
   * */
  getMinCalcNum(targetNum : number): number;
}

class Boj1463 implements IBoj1463 {
  public goal: number;
  public ans: number = 0;

  constructor(arg: number
  ) {
    this.goal = arg;
  }

  getMinCalcNum(targetNum: number): number {
    if (targetNum === 1) {
      return 0;
    }
    if (targetNum < 4) {
      return 1;
    }

    let maxNumBy3square = this.getMaxNumByNsquare(targetNum, 3);
    let minCalcNum;
    while (maxNumBy3square > -1) {
      let maxNumBy2square = this.getMaxNumByNsquare(targetNum / Math.pow(3, maxNumBy3square), 2);
      const rest = targetNum - (Math.pow(3, maxNumBy3square) * Math.pow(2, maxNumBy2square));
      const calcNum = maxNumBy3square + maxNumBy2square + rest;
      if (!minCalcNum || minCalcNum > calcNum) {
        minCalcNum = calcNum;
      }
      maxNumBy3square--;
    }

    return minCalcNum;
  }

  getMaxNumByNsquare(targetNum: number, squareNum: number): number {
    let maxNumNSquare = 0;
    while (!(Math.pow(squareNum, maxNumNSquare) <= targetNum && targetNum < Math.pow(squareNum, maxNumNSquare + 1))) {
      maxNumNSquare++
    }
    return maxNumNSquare;
  }

  run(): void {
    this.ans = this.ans + this.getMinCalcNum(this.goal);
    this.printAns();
  }

  printAns(): void {
    console.log(this.ans);
  }
}

const boj1463 = new Boj1463(args[0]);
boj1463.run();

