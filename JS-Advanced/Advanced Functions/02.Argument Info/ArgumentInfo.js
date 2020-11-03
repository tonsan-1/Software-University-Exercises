function solve(){
    const argTypes = {};

    for(let arg of arguments){
        const type = typeof arg;

        console.log(`${type}: ${arg}`);

        if (argTypes[type] === undefined) {
            argTypes[type] = 0;
            
        }
        argTypes[type]++;
    }

    Object.entries(argTypes).sort((a,b) => b[1] - a[1]).forEach(element => console.log(`${element[0]} = ${element[1]}`));
}
