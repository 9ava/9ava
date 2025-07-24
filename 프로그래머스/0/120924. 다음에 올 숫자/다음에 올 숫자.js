function solution(common) {
    //등차 : b - a === c - b
    //등비 : b / a === c / b
    let i = common.length 
    return common[1] - common[0] === common[2] - common[1] 
        ? common[i - 1] + common[1] - common[0] 
    : common[i - 1] * common[1] / common[0] ;
    
}