class Counter2 {
  static count: number = 0;

  static increment() {
    this.count++;
  }

  static getCount() {
    console.log(this.count);
  }
}

// static 메서드는 인스턴스 없이 호출d
Counter2.increment();
Counter2.increment();
Counter2.increment();
Counter2.getCount(); // 출력: 3
