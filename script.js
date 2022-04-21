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


dot.addEventListener("click", () => {
    if(decimal === "") {
        currentNum += dot.textContent;
        display.textContent = currentNum;
        decimal = "."
    }
})


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

equal.addEventListener("click", () =>{
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
    
});

clear.addEventListener("click", () => {
    previousNum = "";
    currentNum = "";
    operator = "";
    display.textContent = "";
})