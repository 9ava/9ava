class Person {
  //   name: string;
  //   age: number;
  //   constructor(name: string, age: number) {
  //     this.name = name;
  //     this.age = age;
  //   }
  constructor(public name: string, private age: number) {}

  introduce(): string {
    return `Hi, I'm ${this.name}`;
  }
}

class Car implements Vehicle {
  carModel: string;
  owner: string;
  carWeight: number;
  buyYear: number;
  isSunk: boolean;
  mileage: number;
  drive() {
    console.log("Go");
  }

  alarm() {
    console.log("Beep Beep");
  }

  wipe() {
    console.log("Wipe");
  }

  break() {
    console.log("Break");
  }

  accelerate() {
    console.log("Accelerate");
  }

  navigator() {
    console.log("Navigator");
  }
}

class DumpTruck extends Car {
  capacity: number;
  mixing() {
    console.log("Mixing");
  }

  spread() {
    console.log("Spread");
  }
}

class Bus extends Car {
  passenger: number;
  busNumer: number;

  openDoor() {
    console.log("OpenDoor");
  }
}

interface Vehicle {
  break(): void;
  accelerate(): void;
  navigator(): void;
}
