// alert("Hello, World! This is a JavaScript alert.");
// console.log("Hello, World! This is a message in the console.");
// document.write("<h1>Document Write</h1>");

// let currentYear = 2025;
// let birthYear = Number(prompt("태어난 해를 입력하세요"));
// let age = currentYear - birthYear + 1;
// alert("당신의 나이는 " + age + "살입니다.");

// let name = "철수";
// let age = "20";
// let isStudent = true;

// console.log(typeof name);
// console.log(typeof age);
// console.log(typeof isStudent);

// let price = 10000;
// let rate = 0.2;
// let discount = price * rate;
// let finalPrice = price - discount;

// console.log("할인된 가격은" + finalPrice + "원입니다.")

// let name = "영희";
// console.log(`안녕하세요, ${name}님!`)

// let a = 10;

// a += 5;   // 15
// a -= 3;   // 12
// a *= 2;   // 24
// a /= 4;   // 6

// console.log(a);  // 6
// console.log(`최종 값은 ${a} 입니다.`);

// 1. 이름과 나이를 입력받아 인사말 출력하기 

// 2. 두 수를 입력받아 사칙연산 결과를 각각 출력하기

// 3. == vs === 비교 실험하기


// 1. 
// alert("이름과 나이를 입력해주세요");

// let name = prompt("이름을 입력하세요:");
// let age = Number(prompt("나이를 입력하세요:"));

// alert(`안녕하세요, ${name}님! 당신의 나이는 ${age}살입니다.`);

// 2.
// alert("숫자 두 개를 입력하세요. 사칙연산 가능");

// let number1 = Number(prompt("숫자1"));
// let number2 = Number(prompt("숫자2"));

// let operator = prompt("하고 싶은 연산 입력 (예시: 더하기, 빼기, 곱하기, 나누기)");

// let result;

// if (operator === "더하기") {
//     result = number1 + number2;
// } else if (operator === "빼기") {
//     result = number1 - number2;
// } else if (operator === "곱하기") {
//     result = number1 * number2;
// } else if (operator === "나누기") {
//     result = number1 / number2;
// } else {
//     alert("지원하지 않는 연산입니다.");
// }

// if (result !== undefined) {
//     alert(`결과는 ${result}입니다.`);
// // }
// let num = prompt("숫자를 입력하세요.");
// if (num % 3 === 0) {
//     alert("3의 배수 입니다");
// }

// else { alert("3의 배수가 아닙니다."); }

// // 실습 : 3의 배수 검사기
// let num = prompt("숫자를 입력하세요.");
// if (num % 3 === 0) {
//     alert("3의 배수입니다.");
// } else {
//     alert("3의 배수가 아닙니다.");
// }

// let day = prompt("요일을 입력하세요");
// switch (day) {
//     case "월요일":
//         alert("한 주의 시작!")
//         break;
//     case "금요일":
//         alert("불타는 금요일~")
//         break;
// default :
// alert("평범한 하루?");
// }

// ### ✅ 변수 (1\~3)

// **1. 숫자 두 개를 변수로 저장하고 더한 결과를 출력해보세요.**

// let num1 = 5;
// let num2 = 3;

// let sum = num1 + num2;

// // 여기에 더한 결과를 출력해보세요
// console.log(sum);

// // **2. 이름과 나이를 저장하고 다음과 같은 문장을 출력해보세요.**


// `"홍길동님은 20살입니다."`

// let name = prompt("이름을 입력하세요")
// let age = prompt("나이를 입력하세요")
// alert (`${name}님은 ${age}살입니다.`) 
// // 여기에 출력 코드를 작성해보세요


// // **3. 정사각형의 한 변 길이를 변수로 저장하고 넓이를 출력해보세요.**
// let a = prompt("정사각형 한 변의 길이를 입력하세요.");
// let b = a * a;

// alert(`정사각형 넓이 = ${b}`);

// // 4. 
// let number = Number(prompt("숫자를 입력하세요"));

// if (number % 2 === 0) {
//   alert("짝수입니다.");
// } else {
//   alert("짝수가 아닙니다.");
// }


// 5.

// let age = Number(prompt("나이를 입력하세요"))
// if (age >= 19) {
//     alert("성인입니다.")
// }

// else {
//     alert("미성년자입니다.")
// }

// // 6.
// let password = Number(prompt("비번을 입력하세요."));
// while (password !== 1234) {
//     alert("비번이 틀렸습니다.");
//     password = Number(prompt("비번을 다시 입력하세요."));
// }
// alert("로그인 성공");
