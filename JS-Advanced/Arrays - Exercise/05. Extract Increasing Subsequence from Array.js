function solve(arr){

let newArr = [];

let maxNumber = Number.MIN_SAFE_INTEGER;

    arr.forEach(x => {
        if (x > maxNumber) {
            maxNumber = x;
            newArr.push(maxNumber);
        }
    });

    console.log(newArr.join("\r\n"));
}

solve([1, 
    3, 
    8, 
    4, 
    10, 
    12, 
    3, 
    2, 
    24]);