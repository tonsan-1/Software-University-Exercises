function solve(first, second){
first = Number(first);
second = Number(second);

let min = Math.min(first,second);
let max = Math.max(first,second);
let output = 0;

for(let i = min; i >= 0; i--){
    if(min % i == 0 && max % i == 0){
        output = i;
        break;
    } 
}

console.log(output);
}

solve('8', '4');