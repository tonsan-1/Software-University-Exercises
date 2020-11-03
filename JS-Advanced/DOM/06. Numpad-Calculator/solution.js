function solve() {
    let expressionButtonElement = document.getElementById('expressionOutput');
    let resultElement = document.getElementById('resultOutput');

    document.querySelector('.keys').addEventListener('click', symbolClicked);
    document.querySelector('.clear').addEventListener('click', clear);

    function clear() {
        expressionButtonElement.textContent = '';
        resultElement.textContent = '';
    }
    function symbolClicked(event) {
        let input = event.target.value;

        switch (input) {
            case '/':
            case '*':
            case '+':
            case '-':
                expressionButtonElement.textContent += ` ${input} `;
                break;
            case '=':
                let [leftOperand, operator, rightOperand] = expressionButtonElement.textContent.split(' ');

                if (!rightOperand || !operator) {
                    resultElement.textContent = NaN;
                } else {
                    resultElement.textContent = calcResult(+leftOperand,operator,+rightOperand);
                }
                break;
            default:
                expressionButtonElement.textContent += input;
                break;
        }
    }
    function calcResult(leftOperand,operator,rightOperand){
        switch (operator) {
            case '*':
                return leftOperand * rightOperand;
            case '/':
                return  leftOperand / rightOperand;
            case '+':
                return  leftOperand + rightOperand;
            case '-':
                return  leftOperand - rightOperand;
        }
    }
}