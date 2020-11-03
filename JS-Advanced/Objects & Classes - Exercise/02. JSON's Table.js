function solve(input){

    let result = [];

    let html = '<table>' + "\r\n";
    for (const iterator of input) {
        
        result = JSON.parse(iterator);

        html += '<tr>' + "\r\n";
        html += `${Object.values(result).map(x => `<td>${x}</td>`).join("\r\n")}` + "\r\n";
        html += '</tr>' + "\r\n";
    }
    html += '</table>';

    console.log(html);

}
solve(['{"name":"Pesho","position":"Promenliva","salary":100000}',
'{"name":"Teo","position":"Lecturer","salary":1000}',
'{"name":"Georgi","position":"Lecturer","salary":1000}']);