function solution(num, k) {
const a = num
    .toString()
    .indexOf(k)
return a === -1 ? -1 : a + 1;
}