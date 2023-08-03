// Configure consts


// 1. Deposit some money
// 2. Determine num of lines to Bet on
// 3. Collect a bet ammount
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again


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

const balanceElement = document.getElementById('balance');
const spinButton = document.getElementById('spinButton');
const depositButton = document.getElementById('depositButton');
const betAmountElement = document.getElementById('betAmount');
const numberOfLinesElement = document.getElementById('numberOfLines');
const cells = Array.from(document.querySelectorAll('.cell'));


// Initialize Game

const initialize = () => {
    alert('Please deposit money to play');
    updateBalanceDisplay();
};

//Display Balance
const updateBalanceDisplay = () => {
    balanceElement.innerText = balance;
};

// ------------------Handle spin Button----------------

// code waits for a user to click a "spinButton" on a webpage, then it grabs the values from betAmountElement and numberOfLinesElement , user input elements, converts those values to a floating-point number and an integer respectively, and then stores them in variables for later use.

spinButton.addEventListener('click', () => {
    const betAmount = parseFloat(betAmountElement.value);
    const numberOfLines = parseInt(numberOfLinesElement.value);

    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Invalid Bet Amount!');
        return;
    }

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
        alert('Invadid Number of Lines! Please Enter a number between 1 and 3.');
        return;
    }

    if (balance < betAmount * numberOfLines) {
        alert('You do not have enough money tp spin! Please deposit more .');
        return;
    }

    balance -= betAmount * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    const winnings = getWinnings(rows, betAmount, numberOfLines);
    balance += winnings;

    updateGameDisplay(rows);
    updateBalanceDisplay();
});



//---------------Handle Deposit-----------------

depositButton.addEventListener('click', () => {
    const depositAmount = parseFloat(prompt('Enter deposit amount:'));
    if (depositAmount > 0) {
        balance += depositAmount;
        updateBalanceDisplay();
    }
});


// ---------------------SPIN REELS --------------

// Spin Reels
const spin = () => {
    //It first creates an empty array named symbols.
    const symbols = [];
    //then loops over each symbol in SYMBOL_COUNT, which is an object where the keys are symbols and the values are the number of each symbol on a reel.
    for (const symbol in SYMBOL_COUNT) {
        for (let i = 0; i < SYMBOL_COUNT[symbol]; i++) {
            //Each time through this loop, it pushes the symbol into the symbols array.
            symbols.push(symbol);
        }
        //creates an empty array named reels, which will hold the results of the spin.
    }
    const reels = [];
    //creates a loop that runs ROWS times. Each iteration of this loop represents a single row of the slot machine.
    for (let i = 0; i < COLS; i++) {
        // Inside this loop, it creates an empty array named reel, which will represent the symbols on one row of the slot machine.
        const reel = [];
        //It then creates another loop that also runs ROWS times. Each iteration of this loop represents a single slot in the row.
        for (let j = 0; j < ROWS; j++) {
            // This gives a random index into the symbols array.
            const randomIndex = Math.floor(Math.random() * symbols.length);
            // then uses this random index to get a symbol from the symbols array, and pushes this symbol onto the reel
            reel.push(symbols[randomIndex]);
        }
        reels.push(reel);
    }
    return reels;
};

//-----------------Transpose Reels to Rows--------------------

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        const row = [];
        for (let j = 0; j < COLS; j++) {
            row.push(reels[j][i]);

        }
        rows.push(row);
    }
    return rows;
}

// Calculate Winnings
const getWinnings = (rows, betAmount, numberOfLines) => {
    let winnings = 0;
    for (let i = 0; i < numberOfLines; i++) {
        const row = rows[i];
        if (row.every((symbol, _, arr) => symbol === arr[0])) {
            winnings += SYMBOL_VALUES[row[0]];
        }
    }
    return winnings * betAmount;
};


// Update Game Display
const updateGameDisplay = (rows) => {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            cells[i * COLS + j].innerText = rows[i][j];
        }
    }
};

// Initialize Game
initialize();
