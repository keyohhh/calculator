const buttons = document.querySelectorAll('button');
const time = document.querySelector('.time');
let displayValue = "";
let firstNum = null;
let secondNum = null;
let operator = null;
let secondOperator = null;
let result = null;

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toLocaleString()
    let minutes = now.getMinutes().toLocaleString()
    minutes = minutes < 10 ? "0"+minutes : minutes;
    const timeString = `${hours}:${minutes}`;
    time.textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime();

function updateDisplay () {
    const display = document.querySelector('.display')
    display.textContent = displayValue;
    if (displayValue.length > 9 && displayValue.length != null) {
        display.textContent = displayValue.substring(0, 9);
    }
}

updateDisplay()

function btnClick() {
for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            if (buttons[i].classList.contains('number')) {
                displayValue += buttons[i].value;
                updateDisplay()
            } else if (buttons[i].classList.contains('clear')) {
                clear();
            } else if (buttons[i].classList.contains('operator')) {
                firstNum = displayValue;
                operator = buttons[i].value;
                displayValue = buttons[i].value;
                displayValue = "";
                updateDisplay();
            } else if (buttons[i].classList.contains("plus-minus")) {
                displayValue = "-" + displayValue;
                updateDisplay();
            } else if (operator != null) {
                secondNum = displayValue;
                displayValue += buttons[i].value;
                updateDisplay();
            } if (buttons[i].classList.contains("equal")) {
                displayValue = buttons[i].value;
                let result = solve(firstNum, secondNum, operator);
                displayValue = result;
                updateDisplay()
                return result;
            }
        })
    }
    
}

btnClick()

function solve(firstNum, secondNum, operator) {
    if (operator === "+") {
        let result = Number(firstNum) + Number(secondNum);
        displayValue = result;
        updateDisplay()
        return result;
    } else if (operator === "-") {
        let result = firstNum - secondNum;
        return result;
    } else if (operator === "*") {
        let result = firstNum * secondNum;
        return result;
    } else if (operator === "/") {
       if (secondNum === "0") {
        return "STOOPID!"
       } else {
        let result = firstNum / secondNum;
        return result;
       }
    } else if (operator === "%") {
        let result = (firstNum / secondNum) * 100;
        return result;
    }
}

function clear() {
    firstNum = null;
    secondNum = null;
    operator = null;
    displayValue = "";
    updateDisplay()
    }

