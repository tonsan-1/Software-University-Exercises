function solve(input){

    let result = {};

    input.forEach(line => {
        let[name,price] = line.split(" : ");

        price = Number(price);

        let firstLetter = name[0];

        if (!result[firstLetter]) {
            result[firstLetter] = []
        }

        let product = {name,price};

        result[firstLetter].push(product);
    });

    let sortedByLetter = Object.entries(result).sort((curr,next) =>{
      return curr[0].localeCompare(next[0]); 
    });

    for(let i = 0; i< sortedByLetter.length; i++){
        console.log(sortedByLetter[i][0]);

        let sortedByName = sortedByLetter[i][1].sort((a,b) => a.name.localeCompare(b.name));
        sortedByName.forEach(product => {
        console.log(`  ${product.name}: ${product.price}`);
        });
    }
}
solve([
'Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']
);