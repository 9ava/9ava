class Calculator {
  // 오버로드 시그니처들
  add(a: number, b: number): number;
  add(a: number, b: number, c: number): number;

  // 실제 구현
  add(a: number, b: number, c?: number): number {
    if (typeof c === "number") {
      return a + b + c;
    }
    return a + b;
  }
}

// 사용
const calc = new Calculator();
console.log(calc.add(1, 2)); // 3
console.log(calc.add(1, 2, 3)); // 6
