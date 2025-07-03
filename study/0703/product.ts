class Product {
  name: string;
  price: string;

  constructor(name: string, price: string) {
    this.name = name;
    this.price = price;
  }

  display(): void {
    console.log(`제품명: ${this.name}, 가격 ${this.price}`);
  }
}

let myProduct = new Product("아이폰", "130만원");
myProduct.display();
