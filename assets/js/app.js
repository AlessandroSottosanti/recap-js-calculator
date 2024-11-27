// dichiarazione

const $one = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);

const numbersBtn   = $all('.number'); // pulsanti di numeri (da 0 a 9)
const operatorsBtn = $all('.operator'); // pulsanti di operazioni/calcolo
const resultElem   = $one('#result'); // display dei risultati (dove adesso c'è scritto 0)
const cancelBtn    = $one('#cancel'); // pulsante del reset (C)
const backBtn      = $one('#back'); // Bottone indietro
const commaBtn     = $one('#comma'); // pulsante della virgola (.)
const calculateBtn = $one('#calculate'); // pulsante di risultato ( = )

let firstInput;
let operation;
let secondInput;

// LOGICA

// gestisce il click sui numeri
for (let i = 0; i < numbersBtn.length; i++) {
    const numberBtn = numbersBtn[i];

    numberBtn.addEventListener('click', () => {

        if (resultElem.innerText == '0') {
            resultElem.innerText = '';
        }

        resultElem.innerText += numberBtn.innerText;
    });
}

// gestiamo il click sul pulsante cancella
cancelBtn.addEventListener('click', () => {
    resultElem.innerText = '0';
    firstInput = null;
    operation = null;
    secondInput = null;
});

// Gestisce la rimozione dell'ultimo numero
backBtn.addEventListener('click', () => {
    resultElem.innerText = resultElem.innerText.slice(0, -1);
    if (resultElem.innerText === '') {
        resultElem.innerText = '0';
    }
});

// Gestisce la virgola
commaBtn.addEventListener('click', () => {
    if (!resultElem.innerText.includes('.')) {
        resultElem.innerText += '.';
    }
});

// gestiamo il click sui pulsanti delle operazioni
for (let i = 0; i < operatorsBtn.length; i++) {
    const operatorBtn = operatorsBtn[i];
    operatorBtn.addEventListener('click', () => {
        firstInput = parseFloat(resultElem.innerText);  
        operation = operatorBtn.getAttribute('data-operator');
        resultElem.innerText = '0';
    });
}


calculateBtn.addEventListener('click', () => {

    secondInput = parseFloat(resultElem.innerText);

    let result = 0;

    if (operation === '+') {
        result = firstInput + secondInput;
    } 
    else if (operation === '-') {
        result = firstInput - secondInput;
    } 
    else if (operation === '*') {
        result = firstInput * secondInput;
    } 
    else if (operation === '/') {
        result = secondInput === 0 ? 'Error' : firstInput / secondInput; // Controllo divisione per 0
    }
    else if (operation === '^') {
        result = Math.pow(firstInput, secondInput); // Elevazione a potenza
    }
    else if (operation === '√') {
        result = firstInput < 0 ? 'Error' : Math.sqrt(firstInput); // Radice quadrata con controllo numeri negativi
    }
    else if (operation === '%') {
        result = firstInput % secondInput; // Modulo
    }
    else if (operation === '!') {
        result = factorial(firstInput); // Fattoriale
    }
    else if (operation === '1/x') {
        result = firstInput === 0 ? 'Error' : 1 / firstInput; // Inverso con controllo divisione per 0
    }
    else if (operation === '|x|') {
        result = Math.abs(firstInput); // Valore assoluto
    }

    resultElem.innerText = result;
});