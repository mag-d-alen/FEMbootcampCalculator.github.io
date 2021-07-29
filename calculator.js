let total = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.screen');

//assign event listener to html buttons
const init = () => {
  document.querySelector('.calc-buttons').addEventListener('click', (e) => {
    buttonClick(e.target.innerText);
  });
};

// check if the text on the clicked button is a number
const buttonClick = (inTextsymbol) => {
  if (isNaN(inTextsymbol)) {
    handleSymbol(inTextsymbol);
  } else {
    handleNumber(inTextsymbol);
  }
  screen.innerText = buffer;
};

// handle number
const handleNumber = (numberString) => {
  if (buffer === '0') {
    buffer = numberString;
  } else {
    buffer = buffer + numberString; // add number at the end of the string
  }
};

//handle function buttons operators
const handleSymbol = (symbol) => {
  switch (symbol) {
    case 'C':
      buffer = '0';
      total = 0;
      break;
    case '/':
    case '*':
    case '-':
    case '+':
      handleMath(symbol);
      break;
    case '=':
      handleEqual();
      break;
    case '←':
      handleArrow();
      break;
  }
};

//  handle cases in which there is no need for math
const handleMath = (symbol) => {
  const bufferNumber = +buffer; //turns string onto number
  if (buffer === '0') {
    return;
  }
  if (total === 0) {
    //no total yet
    total = bufferNumber;
  } else {
    flushOperation(bufferNumber);
  }
  previousOperator = symbol;
  buffer = '0';
};

//handle math operations
const flushOperation = (bufferNumber) => {
  switch (previousOperator) {
    case '+':
      total = total + bufferNumber;
      break;
    case '-':
      total = total - bufferNumber;
      break;
    case '*':
      total = total * bufferNumber;
      break;
    case '/':
      total = total / bufferNumber;
      break;
  }
};

//displaying total
const handleEqual = () => {
  //there was no operation
  if (previousOperator === null) {
    return;
  } else {
    flushOperation(parseInt(buffer));
    previousOperator = null;
    buffer = total;
    total = 0;
  }
};

// number into string and delete last item in the string
const handleArrow = () => {
  if (buffer.length === 1) {
    buffer = '0';
  } else {
    buffer = buffer.toString().slice(0, -1);
  }
};

init();
