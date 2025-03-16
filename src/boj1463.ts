var fs = require('fs');
var args:number[] = fs.readFileSync('./input.txt', 'utf8').toString().trim().split(" ").map(input => parseInt(input));

interface IBoj1463 {
  /**
   * 정답 수
   * */
  goal: number;

  /**
   * 가능한 최소수 찾기
   *
   * 3의 몇제곱에 근접한 수 인지 찾는다
   * */
  getPossibleMin(): number;

  /**
   * 3과 2의 조합으로 goal 또는 goal - 1을 만들 수 있는지 확인
   * 만들면 만들어진 num return 아니라면 null return
   * */
  getComposedNum(goalNum : number, elementsNum : number): number | null;

  /**
   * 반복을 돌면서 만족하는 배열조합찾기
   *
   * 만들어진 배열 길이를 return 한다.
   * */
  findAnswerByLoop(goalNum: number, elementsNum : number): number;
}

class Boj1463 implements IBoj1463 {
  public goal: number;

  constructor(arg : number
  ) {
    this.goal = arg;
  }

  getPossibleMin(): number {
    let minVal = 0;
    while (!(Math.pow(3, minVal) <= this.goal && this.goal < Math.pow(3, minVal + 1))) {
      minVal++;
    }
    return this.goal % 3 === 0 ? minVal : minVal + 1;
  }

  getComposedNum( elementsNum : number): number | null{
    let use2Num = 0;
    while (true) {
      const numByComposed = Math.pow(3, elementsNum - use2Num) * Math.pow(2, use2Num++);
      if (numByComposed === this.goal || numByComposed === this.goal - 1) {
        return numByComposed;
      }
      if (use2Num === elementsNum) {
        return null;
      }
    }
  }

  findAnswerByLoop(): number {
    if (this.goal === 1) {
      return 0;
    }
    let possibleMin = this.getPossibleMin();

    while (true) {
      const composedNum = this.getComposedNum(possibleMin);
      if (composedNum) {
        return composedNum === this.goal ? possibleMin : possibleMin + 1;
      }
      possibleMin++;
    }
  }
}

const boj1463 = new Boj1463(args[0]);
console.log(boj1463.findAnswerByLoop());

