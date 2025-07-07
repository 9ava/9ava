function solution(number) {
    let sum = number
        .toString()
        .split('')
    .map(Number)
    .reduce((a, b) => a + b , 0) 
    
    return (sum % 9);
}
