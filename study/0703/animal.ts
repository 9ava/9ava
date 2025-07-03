class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sound(): void {
    console.log("울음소리");
  }
}

class Dog extends Animal {
  sound(): void {
    console.log(`${this.name}: 멍멍`);
  }
}

class Cat extends Animal {
  sound(): void {
    console.log(`${this.name}: 야옹`);
  }
}

const dog = new Dog("멍멍이");
dog.sound(); // 출력: 멍멍이: 멍멍

const cat = new Cat("나비");
cat.sound(); // 출력: 나비: 야옹
