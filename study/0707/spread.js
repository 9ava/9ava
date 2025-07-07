//구조 분해, 스프레드 연산자
const user = { id: 1, name: "Kim", age: 20, address: "Seoul" };
const updated = { id: 2, ...user, name: "Lee" };

console.log(updated);

const userArr = [1, 2, 3, 4, 5];
const updatedArr = [1, 2, ...userArr, 6, 7];

console.log(updatedArr);

//구조 분해
const userSplit = { id: 1, name: "Kim", age: 20, address: "Seoul" };
// const { id, name, age, address } = userSplit;

// console.log(id, name, age, address);

const { id, name, ...rest } = userSplit;
console.log(id, name, rest);

//1. 구조 분해 할당을 이용해 다음 객체에서 'title'과 'author'를 추출해보세요:
const Book = { title: "제목", author: "작가" };
const { title, author } = Book;

console.log(title, author);
