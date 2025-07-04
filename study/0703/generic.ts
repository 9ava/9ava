function identity<T>(value: T): T {
  return value;
}
let output = identity<string>("hello");
console.log(output);

function getValue<K extends string, V>(obj: Record<K, V>, key: K): V {
  return obj[key];
}

let objects = [
  { name: "john", age: 20 },
  { name: "jane", age: 21 },
];
