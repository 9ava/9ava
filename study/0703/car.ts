class Car {
  drive(driver: Driver) {
    console.log(`${driver.name}님 운전을 시작합니다.`);
  }
}

class Driver {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

let car = new Car();
let driver = new Driver("홍길동");
car.drive(driver);
