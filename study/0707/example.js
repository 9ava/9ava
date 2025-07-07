// //연습문제1.
// const arr = [1, 2, 2, 3, 4, 5, 5];

// const set = new Set(arr);

// for (let num of set) {
//   console.log(Number(num) + 5);
// }

// const map = new Map();
// map.set(
//   "total",
//   [...set].reduce((acc, cur) => acc + cur),
//   0
// );

// console.log(map.get("total"));

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("data OK!");
    }, 2000);
  });
}

async function loadData() {
  const data = await fetchData();
  console.log(data);
}

loadData();
