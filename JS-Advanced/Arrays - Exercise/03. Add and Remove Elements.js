function solve(arr){
    let number = 1;

    let array = [];

    for (let index = 0; index <= arr.length - 1; index++) {
        const command = arr[index];

        if (command == 'add') {
            array.push(number);
        }
        else if (command == 'remove') {
            array.pop();
        }

        number++;

    }

    if (array.length == 0) {
        console.log('Empty');
    } else {
        console.log(array.join("\r\n"));
    }
}

solve(['remove', 
'remove', 
'remove']
);