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
   * 3으로나눈 몫과 나머지를 반환한다.
   * */
  getRetNRestDivBy3(num : number): RetNRest;

  /**
   * 정답찾기
   * */
  findAnsByLoop(): number;


}

class Boj1463 implements IBoj1463 {
  public goal: number;

  constructor(arg : number
  ) {
    this.goal = arg;
  }

  getRetNRestDivBy3(num: number): RetNRest {
    return {
      ret: num / 3,
      rest: num % 3,
    };
  }

  findAnsByLoop(): number {
    if (this.goal === 1) {
      return 0;
    }
    let ans = 0;
    const initRet : RetNRest = {
      ret: this.goal,
      rest: 0,
    }

    while (initRet.ret > 3) {
      initRet.rest = initRet.ret % 3;
      initRet.ret = parseInt((initRet.ret / 3).toFixed());
      // console.log(initRet);
      ans += (1 + initRet.rest);
    }

    return ans + 1;
  }
}

const boj1463 = new Boj1463(args[0]);
console.log(boj1463.findAnsByLoop());

