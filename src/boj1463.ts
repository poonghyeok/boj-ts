var fs = require('fs');
var args:number[] = fs.readFileSync('./input.txt', 'utf8').toString().trim().split(" ").map(input => parseInt(input));

interface ExpandSet{
  /**
   * 확장 기존 treeNumSet에 집어넣기
   */
  expand(currTreeNumSets : Array<Set<number>>) : void

  /**
   * 새로운 Set<number> 생성하기
   * */
  genSet(currTreeNumSets : Array<Set<number>>) : Set<number>

  /**
   * 새로운 Set<number>에 속할 수 있는지 확인
   *
   * 이전 Set에도 존재하면 안되고 현재 생성되는 Set에도 있으며 안됨.
   * */
  isAble2Add2NewSet(currTreeNumSets : Array<Set<number>>, num : number) : boolean
}

interface IBoj1463 {
  /**
   * 정답 수
   * */
  answer : number

  /**
   * set array
   * */
  treeNumSets : Array<Set<number>>

  /**
   * 초기상태 설정
   * 첫번쨰 set은 2,3으로 시작
   * */
  initState() : void

  /**
   * set array 확장 모듈
   * */
  expandModule : ExpandSet

  /**
   * 현재 Set(treeNumSet)에 정답이 포함되어 있는지 확인
   * */
  containAnswer() : boolean

  /**
   * 정답 찾기
   *
   * 정답이 나올 때까지 Array<Set>을 확장하고 정답이 나오면 Array length 반환
   * */
  findAnswerByLoop() : number
}

class Boj1463 implements IBoj1463 {
  public answer : number
  public treeNumSets : Array<Set<number>>

  constructor(arg : number) {
    this.answer = arg;
    this.treeNumSets = new Array<Set<number>>();
  }

  initState() {
    this.treeNumSets.push(new Set<number>([2,3]));
  }

  expandModule : ExpandSet = {
    isAble2Add2NewSet(currTreeNumSets: Array<Set<number>>, num): boolean {
      return currTreeNumSets.find(set => set.has(num)) === undefined;
    },
    expand(currTreeNumSets: Array<Set<number>>) {
      currTreeNumSets.push(this.genSet(currTreeNumSets));
    },
    genSet(currTreeNumSets: Array<Set<number>>): Set<number> {
      const prevSet = currTreeNumSets[currTreeNumSets.length - 1];
      const newSet = new Set<number>();
      prevSet.forEach(num => {
        const getNums = [num + 1, num * 2, num * 3];
        getNums.forEach(genNum => {
          if (this.isAble2Add2NewSet(currTreeNumSets, genNum)) {
            newSet.add(genNum);
          }
        })
      })
      return newSet;
    }
  }

  containAnswer(): boolean {
    return this.treeNumSets[this.treeNumSets.length - 1].has(this.answer);
  }

  findAnswerByLoop(): number {
    this.initState();
    while(!this.containAnswer()){
      this.expandModule.expand(this.treeNumSets);
    }
    return this.treeNumSets.length;
  }

  printAnswer(){
    if (this.answer === 1) {
      console.log(0);
      return false;
    }
    console.log(this.findAnswerByLoop());
  }
}

new Boj1463(args[0]).printAnswer();
