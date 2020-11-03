function solve(arr){
    let incrementor = Number(arr[arr.length - 1]);
    arr.pop();

    for(let i = 0; i <= arr.length - 1; i += incrementor){
       
        console.log(arr[i]);
    }
}

solve(['1', 
'2',
'3', 
'4', 
'5', 
'6']
);