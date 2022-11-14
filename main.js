'use strict';

const OPERATORS = {
  x: '*',
  X: '*',
  '–': '-',
  '-': '-',
  '+': '+',
  '÷': '/',
  '/': '/',
};

// array and event listeners for buttons
const buttons = Array.from(document.querySelectorAll('.btn'));
buttons.map(button => button.addEventListener('click', handleClicks));

let displayText = '';
// console.log((str += ' +'));
// console.log((str += ' 1'));
// console.log(math.evaluate(str));

function handleClicks(event) {
  let text = event.target.innerText;

  // normalize input
  text = OPERATORS[text] ?? text;

  // clear display
  if (text === 'C') {
    clearDisplay();
    return;
  }

  // calculate result
  if (text === '=') {
    let result = calculateResult(displayText);
    clearDisplay();
    updateDisplay(result);
    return;
  }

  // add leading zero to decimal input
  if (text === '.' && displayText === '') text = '0.1';

  // Recover from Errors
  if (displayText.includes('ERROR')) clearDisplay();

  // all buttons except clear and equals
  updateDisplay(text);
}

// initialize display
function updateDisplay(text) {
  displayText += text;
  renderDisplay();
}

function clearDisplay() {
  displayText = '';
  renderDisplay();
}

function renderDisplay() {
  let displayNode = document.querySelector('.display');
  displayNode.innerText = displayText;
}

function calculateResult(text) {
  try {
    return math.evaluate(text);
  } catch (error) {
    return 'ERROR';
  }
}

// MAIN
clearDisplay();
