function solve(arr){
    let number = Number(arr[0]);

    let arrayLength = arr.length;

    for(let i = 1; i < arrayLength; i++){
        
        let action = arr[i];

        if(action == 'chop'){
            number = number / 2;
        } else if(action == 'dice'){
            number = Math.sqrt(number);
        } else if(action == 'spice'){
            number = number + 1;
        } else if(action == 'bake'){
            number = number * 3;
        } else if(action == 'fillet'){
            number = number - (number * 0.2);
        }

        console.log(number);
    }

}
solve(['32', 'chop', 'chop', 'chop', 'chop', 'chop'])