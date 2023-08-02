// Configure consts

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A: 6,
    B: 8,
    C: 10,
    D: 12
};

const SYMBOL_VALUES = {
    A: 2,
    B: 2,
    C: 12,
    D: 12
};

// State 
let balance = 0;

// DOM rreferences

const balanceElement = document.getElementById(' balance');
const spinButton = document.getElementById('spinButton');
const depositButton = document.getElementById('depositButton');
const betAmount = document.getElementById('betAmount');
const numberOfLines = document.getElementById('numberOfLines');
const cells = document.querySelectorAll('.cell');


// Initialize Game

const initialize = () => {
    updateBalanceDisplay();
};
//Display Balance
const updateBalanceDisplay = () => {
    balanceElement.innerText = balance;
};

// Handle spin Button

spinButton.addEventListener('click', () => {
    const betAmount = parseFloat(betAmountElement.value);
    const numberOfLines = parseInt(numberOfLinesElement.value);
})