function add(number){
    console.log(number);
    return (number2) => console.log(add(number + number2));
} 