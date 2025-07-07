//고차 배열 메서드
const nums = [1, 2, 3, 4, 5];

const squares = nums.map((n) => n ** 2);

for (const val of squares) {
  console.log(`val => ${val}`);
}

for (let i = 0; i < nums.length; i++) {
  console.log(`nums[${i}] => ${nums[i]}, squares[${i}] => ${nums[i] ** 2}`);
}

const evens = nums.filter((n) => n % 2 === 0);

for (const val of evens) {
  console.log(`val => ${val}`);
}

const sum = nums.reduce((acc, cur) => {
  acc += cur;
  console.log(`ac => ${acc}, cur => {cur}`);
  return acc;
}, 0);
console.log(`sum => ${sum}`);

const found = nums.find((n) => n > 2);
console.log(`found=>${found}`);

const filter = nums.filter((n) => n > 2);
console.log(`filter=>${filter}`);
