function solution(hp) {
  // 장군 : 5 , 병정 : 3 , 일개미 : 1 
    const a = Math.trunc(hp / 5);
    const b = Math.trunc(hp % 5 / 3 );
    const c = Math.trunc(hp % 5 % 3);
    return a + b + c
   
}