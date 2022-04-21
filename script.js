'use strict';

function operate(operator, num1, num2) {
    if(operator === '+') {
        return num1 + num2;
    } else if(operator === '-') {
        return num1 - num2;
    } else if(operator === '*') {
        return num1 * num2;
    } else if(operator === '/') {
        return num1 / num2;
    }
}

let currentNum = "";
let previousNum = "";
let operator = "";
let decimal = "";


const display = document.querySelector(".display");

const numbers = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".operator");

const equal = document.querySelector(".equal");

const clear = document.querySelector(".clear");

const dot = document.querySelector(".dot");


numbers.forEach(number => {
    number.addEventListener("click", () => {
        currentNum += number.textContent;
        display.textContent = currentNum;
    });
});

function dotHandler() {
    if(decimal === "") {
        currentNum += dot.textContent;
        display.textContent = currentNum;
        decimal = "."
    }  
}

dot.addEventListener("click", dotHandler);

function equalHandler() {
    if(previousNum === "" && currentNum === "") {
        display.textContent = "Input number"
    } else {
        previousNum = Number(previousNum);
        currentNum = Number(currentNum);
        console.log(operator, currentNum);
        if(operator === "/" && currentNum == 0) {
            display.textContent = "Bruh";
            previousNum = "";
            currentNum = "";
            operator = "";
        } else {
            display.textContent = operate(operator, previousNum, currentNum).toFixed(2);
            currentNum = operate(operator, previousNum, currentNum).toFixed(2);
            operator = "";
            }
    }
}

equal.addEventListener("click", equalHandler);


operators.forEach(op => {
    op.addEventListener("click", (e) => {
        if(operator !== "") {
            if(operator === "/" && currentNum == 0) {
                display.textContent = "Bruh";
                previousNum = "";
                currentNum = "";
                operator = "";
            } else {
                previousNum = Number(previousNum);
                currentNum = Number(currentNum);
                display.textContent = operate(operator, previousNum, currentNum).toFixed(2);  
                previousNum = operate(operator, previousNum, currentNum).toFixed(2);
                currentNum = ""; 
                operator = op.textContent;
            }
        } else {
            previousNum = currentNum;
            operator = op.textContent;
            currentNum = "";
        }
        decimal = "";
    });
});

function clearHandler() {
    previousNum = "";
    currentNum = "";
    operator = "";
    display.textContent = "";
}

clear.addEventListener("click", clearHandler);


document.addEventListener("keydown", (e) => {
    const numbers = ['1','2','3','4','5','6','7','8','9','0'];
    const operators = ['+','-','*','/'];
    if(numbers.includes(e.key)) {
        currentNum += e.key;
        display.textContent = currentNum;
    } else if(operators.includes(e.key)) {
        if(operator !== "") {
            if(operator === "/" && currentNum == 0) {
                display.textContent = "Bruh";
                previousNum = "";
                currentNum = "";
                operator = "";
            } else {
                previousNum = Number(previousNum);
                currentNum = Number(currentNum);
                display.textContent = operate(operator, previousNum, currentNum).toFixed(2);  
                previousNum = operate(operator, previousNum, currentNum).toFixed(2);
                currentNum = ""; 
                operator = e.key;
            }
        } else {
            previousNum = currentNum;
            operator = e.key;
            currentNum = "";
        }
        decimal = "";
    } else if(e.key === '=' || e.key === 'Enter') {
        equalHandler();
    } else if(e.key === '.') {
        dotHandler();
    } else if(e.key === 'Backspace') {
        clearHandler();
    }
});

