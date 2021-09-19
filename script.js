const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('uppercase');
const lowerEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const clipBoardEl = document.getElementById('clipboard');


clipBoardEl.addEventListener('click', () =>{
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){return}

    textarea.value = password;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    alert('Password copied to clipboard!');
})



generateBtn.addEventListener('click', ()=>{
    const length = +lengthEl.value; //to convert to number added plus;
    const haslower = lowerEl.checked;
    const hasupper = upperEl.checked;
    const hasnumber = numbersEl.checked;
    const hassymbol = symbolEl.checked;

    resultEl.innerText = generatePassword(haslower,hasupper,hasnumber,hassymbol,length);

})



function generatePassword(lower,upper,number,symbol,length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item =>Object.values(item)[0]);


    if(typesCount === 0 ){
        return '';
    }

    for (let i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type =>{
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;

}

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}




function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}


function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() *10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}


