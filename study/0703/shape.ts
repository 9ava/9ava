abstract class Shape {
  abstract getAreaRectangle(width: number, height: number): number;
  abstract getAreaCircle(radius: number): number;
}

class Rectangle extends Shape {
  getAreaRectangle(width: number, height: number): number {
    return width * height;
  }

  getAreaCircle(radius: number): number {
    throw new Error("Rectangle does not implement circle area");
  }
}

class Circle extends Shape {
  getAreaRectangle(width: number, height: number): number {
    throw new Error("Circle does not implement rectangle area");
  }

  getAreaCircle(radius: number): number {
    return Math.PI * radius * radius;
  }
}

// 사용 예
const circle = new Circle();
console.log(circle.getAreaCircle(5)); // 78.5398...

const rect = new Rectangle();
console.log(rect.getAreaRectangle(4, 3)); // 12
