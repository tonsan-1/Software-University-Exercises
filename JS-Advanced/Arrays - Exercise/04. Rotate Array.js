function solve(arr){
    let rotations = arr[arr.length - 1];
    arr.pop();

    if (rotations > 1000) {
            
        rotations %= 1000;
    }

    for (let index = 0; index < rotations; index++) {

        const lastElement = arr[arr.length - 1];

        arr.unshift(lastElement);
        arr.pop();
    }

    console.log(arr.join(' '));
}

solve(['Banana', 
'Orange', 
'Coconut', 
'Apple', 
'1001']);