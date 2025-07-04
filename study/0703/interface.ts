interface Moveable {
  move(): void;
}

class Car implements Moveable {
  move(): void {
    console.log("car");
  }
}

class Robot implements Moveable {
  move(): void {
    console.log("robot");
  }
}
