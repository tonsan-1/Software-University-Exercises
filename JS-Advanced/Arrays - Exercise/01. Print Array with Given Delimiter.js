function solve(arr){
    let delimiter = arr[arr.length - 1];
    arr.pop();

    console.log(arr.join(delimiter));
}

solve(['How about no?', 
'I',
'will', 
'not', 
'do', 
'it!', 
'_']);