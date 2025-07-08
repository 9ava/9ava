function solution(price) {
    return Math.trunc(price >= 500000 ? 0.8 * price
    : price >= 300000 ? 0.9 * price
    : price >= 100000 ? 0.95 * price
    : price);
}