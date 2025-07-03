class Person {
  name: string;
  age: number;

  constructor(name: string = "Alice", age: number = 20) {
    this.name = name;
    this.age = age;
  }

  introduce(): string {
    return `안녕하세요, 저는 ${this.age}살 ${this.name}입니다.`;
  }
}

const person = new Person(); // 기본값: Alice, 20
console.log(person.introduce());
