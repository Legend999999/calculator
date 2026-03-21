// -------- Numbers map --------
const numbers = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
};

// -------- Calculator state --------
let finalResult = 0;
let operator = '';
let activeOperator = false;

// -------- Secret code --------
let secret = "";
const targetCode = "00013";

const checkSecret = (digit) => {
    secret += digit;

    if (secret.length > targetCode.length) {
        secret = secret.slice(-targetCode.length);
    }

    if (secret === targetCode) {
        window.location.href = "https://accounts.snapchat.com/v2/login"; // 🔥 change link here
    }
};

// -------- Buttons --------

// AC (clear)
$('#ac').click(() => {
    $('.result').text('0');
    finalResult = 0;
    operator = '';
    activeOperator = false;
});

// + / - toggle
$('#sign').click(() => {
    if (firstChar() === '-') {
        let result = $('.result').text();
        let substr = result.substring(1);
        $('.result').text(substr);
    } else if (!emptyResult()) {
        prepend('-');
    }
});

// Percentage
$('#percentage').click(() => {
    if (!emptyResult()) {
        let percentage = parseFloat($('.result').text()) / 100;
        $('.result').text(percentage);
    }
});

// Operators
$('.operator').click(e => {
    let id = e.target.id;

    if (id === 'equal') {
        calculate();
        $('.result').text(finalResult);
        operator = '';
        activeOperator = false;
    } else {
        operator = id;
        activeOperator = true;
    }
});

// Numbers
$('.number').click(e => {
    let id = e.target.id;
    let num = numbers[id];

    checkSecret(num); // 🔥 secret trigger

    if (firstChar() === '0' && !pointIncluded()) {
        $('.result').text('');
    }

    if (firstChar() === '0') {
        if (secondChar() === '.') {
            append(num);
        }
    }

    if (activeOperator) {
        finalResult = parseFloat($('.result').text());
        $('.result').text('');
        activeOperator = false;
    }

    if (firstChar() === '0') {
        if (hasChar('.')) {
            append(num);
        }
    } else {
        append(num);
    }
});

// Decimal point
$('#point').click(() => {
    if (emptyResult()) {
        append('0.');
    } else if (!pointIncluded()) {
        append('.');
    }
});

// -------- Functions --------

// Calculate
const calculate = () => {
    let actResult = parseFloat($('.result').text());

    switch (operator) {
        case 'addition':
            finalResult += actResult;
            break;
        case 'subtraction':
            finalResult -= actResult;
            break;
        case 'multiplication':
            finalResult *= actResult;
            break;
        case 'division':
            finalResult /= actResult;
            break;
        default:
            break;
    }
};

// Helpers
const emptyResult = () => {
    return $('.result').text() === '';
};

const hasChar = (char) => {
    let result = $('.result').text();
    return result.indexOf(char) !== -1; // ✅ fixed
};

const firstChar = () => {
    return $('.result').text().charAt(0);
};

const secondChar = () => {
    return $('.result').text().charAt(1);
};

const pointIncluded = () => {
    let result = $('.result').text();
    return result.includes('.');
};

const append = (txt) => {
    let result = $('.result').text();
    $('.result').text(result + txt);
};

const prepend = (sign) => {
    let result = $('.result').text();
    $('.result').text(sign + result);
};