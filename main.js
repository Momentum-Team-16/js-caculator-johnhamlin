'use strict';

const OPERATORS = {
  '(': '(',
  ')': ')',
  mod: '%',
  '%': '%',
  exp: '^',
  '^': '^',
  x: '*',
  X: '*',
  '*': '*',
  '–': '-',
  '-': '-',
  '+': '+',
  '÷': '/',
  '/': '/',
  '.': '.',
};

const VALID_INPUT = {
  ...OPERATORS,
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  '=': '=',
  Enter: '=',
  c: 'C',
  C: 'C',
  '⌫': 'Backspace',
  Backspace: 'Backspace',
};

let displayText = '';
let resultCalculated = false;

// array and event listeners for buttons
const buttons = Array.from(document.querySelectorAll('.btn'));
buttons.map(button => button.addEventListener('click', handleClick));

window.addEventListener('keydown', handleKeypress);

function handleKeypress(event) {
  if (VALID_INPUT[event.key]) {
    handleInput(event.key);
  }
}

function handleClick(event) {
  let text = event.target.innerText;
  handleInput(text);
}

function handleInput(input) {
  // normalize input
  input = VALID_INPUT[input] ?? input;

  // clear display
  if (input === 'C') {
    clearDisplay();
    return;
  }

  // calculate result
  if (input === '=') {
    let result = calculateResult(displayText);
    clearDisplay();
    updateDisplay(result);
    return;
  }

  // backspace
  if (input === 'Backspace') {
    displayText = displayText.slice(0, -1);
    renderDisplay();
    return;
  }

  // prevent multiple operators entered in a row
  if (OPERATORS[input] && OPERATORS[displayText.at(-1)]) return;

  // add leading zero to decimal input
  if (input === '.' && displayText === '') input = '0.1';

  // Recover from Errors
  if (displayText.includes('ERROR')) clearDisplay();

  // prevent adding more numbers to an old result
  // if (displayText !== '' && !OPERATORS[input] && resultCalculated) {
  //   console.log('here');
  //   clearDisplay();
  // }

  // Otherwise, just add the value to the display
  updateDisplay(input);
}

// initialize display
function updateDisplay(text) {
  displayText += text;
  renderDisplay();
}

function clearDisplay() {
  resultCalculated = false;
  displayText = '';
  renderDisplay();
}

function renderDisplay() {
  let displayNode = document.querySelector('.display');
  displayNode.innerText = displayText;
}

function calculateResult(text) {
  resultCalculated = true;
  try {
    return math.evaluate(text);
  } catch (error) {
    return 'ERROR';
  }
}

// MAIN
clearDisplay();
