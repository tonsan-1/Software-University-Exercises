function solve(number){

    number = Number(number);

    let isSameDigit = true;
    let previousDigit = number % 10;
    let sum = 0;

    while(number > 0){
        let currentDigit = number % 10;
        sum += currentDigit;
        if(currentDigit != previousDigit){
            isSameDigit = false;
        }
        previousDigit = currentDigit;
        number = Math.trunc(number / 10);
    }

    console.log(isSameDigit);
    console.log(sum);
}

solve(1234);