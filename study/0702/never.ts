function oldEnough(age: number): never | boolean {
  if (age > 59) {
    throw Error("Too old!");
  }
  if (age <= 18) {
    return false;
  } else {
    return true;
  }
}

console.log(oldEnough(15));
