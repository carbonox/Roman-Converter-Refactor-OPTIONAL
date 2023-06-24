//romans.js

const romanNumeralRegex = new RegExp(
  /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
);

const numberRegex = new RegExp(/^\d+$/);

const mapping = {
  1: "I",
  5: "V",
  10: "X",
  50: "L",
  100: "C",
  500: "D",
  1000: "M",
};

function init() { 
  document.getElementById("mode-selector").addEventListener("change", toggleMode);
  document.getElementById("convert-button").addEventListener("click", convert);
}

function toggleMode(e) {
  document.getElementById("title").textContent = e.target.checked ? "Integer To Roman" : "Roman To Integer";
}

function convert() {
  const input = document.getElementById("conversion-input").value;
  const output = document.getElementById("convert-output");
  if (document.getElementById("mode-selector").checked) {
    const result = convertIntegerToRoman(input);
    output.textContent = result ? result : "Invalid input";
  } else {
    const result = convertRomanToInteger(input);
    output.textContent = result ? result : "Invalid input";
  }
}

function convertRomanToInteger(roman) {
  if (!romanNumeralRegex.test(roman)) {
    return false;
  }

  let values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let sum = 0;
  let prevValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    if (values[roman[i]] >= prevValue) {
      sum += values[roman[i]];
    } else {
      sum -= values[roman[i]];
    }

    prevValue = values[roman[i]];
  }

  return sum;
}

function convertIntegerToRoman(num) {
  if (!numberRegex.test(num) || num < 1 || num > 3999) {
    return false;
  }

  let str = "";
  let count = 1;

  while (num > 0) {
    let last = num % 10 * count;
    str = convertDigitToRoman(last) + str;

    count *= 10;
    num = Math.floor(num / 10);
  }

  return str;
}

function convertDigitToRoman(num) {
  if (num in mapping) {
    return mapping[num];
  }

  const keys = Object.keys(mapping).map(Number).sort((a, b) => b - a);
  
  for (let i = 0; i < keys.length; i++) {
    if (num > keys[i]) {
      if (num - keys[i] in mapping) {
        return mapping[keys[i]] + mapping[num - keys[i]];
      } else {
        return mapping[keys[i]] + mapping[1].repeat((num - keys[i]) / 1);
      }
    }
  }

  return mapping[1].repeat(num);
}
