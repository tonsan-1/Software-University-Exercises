function solve(input){

    let result = {};

    input.forEach(line => {
        let[systemName,component, subComponenet] = line.split(" | ");

        if (!result[systemName]) {
            result[systemName] = {};
        }

        if (!result[systemName][component]) {
            result[systemName][component] = [];
        }

        result[systemName][component].push(subComponenet);
    });

    Object.entries(result).sort((a,b) => {
        return Object.entries(b[1]).length - Object.entries(a[1]).length || a[0].localeCompare(b[0]); 
    }).forEach(([system,components]) => {
        console.log(system);
        Object.entries(components).sort((a,b) => {
            return b[1].length - a[1].length
        }).forEach(([component,subcomponents]) => {
            console.log(`|||${component}`);
            subcomponents.forEach(sub => console.log(`||||||${sub}`));
    });
    });
}
solve(['SULS | Main Site | Home Page',
'SULS | Main Site | Login Page',
'SULS | Main Site | Register Page',
'SULS | Judge Site | Login Page',
'SULS | Judge Site | Submittion Page',
'Lambda | CoreA | A23',
'SULS | Digital Site | Login Page',
'Lambda | CoreB | B24',
'Lambda | CoreA | A24',
'Lambda | CoreA | A25',
'Lambda | CoreC | C4',
'Indice | Session | Default Storage',
'Indice | Session | Default Security']);