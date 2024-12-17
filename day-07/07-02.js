const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "input.txt");

const getData = (filePath) => {
  try {
    return fs.readFileSync(filePath, "UTF-8");
  } catch (err) {
    console.log(err);
    return null;
  }
};

const processData = (data) => {
  let result = [];
  let row = "";

  const processRow = (row) => {
    let inputValues = [];
    let testValue = "";
    const pattern = /(\d+)/g;
    const arr = [...row.matchAll(pattern)];
    testValue = parseInt(arr[0][1]);
    for (let i = 1; i < arr.length; i++) {
      inputValues.push(parseInt(arr[i][1]));
    }
    return { testValue: testValue, inputValues: inputValues };
  };
  for (const char of data) {
    if (char === "\n") {
      continue;
    }
    if (char === "\r") {
      result.push(processRow(row));
      row = "";
    } else {
      row += char;
    }
  }
  result.push(processRow(row));
  return result;
};

const plus = (a, b) => a + b;
const multipl = (a, b) => a * b;

const getBinary = (dec) => {
  return (dec >>> 0).toString(2);
};

const getTerciary = (dec) => {
  const stack = [];
  let result = "";
  while (dec != 0) {
    stack.push(dec % 3);
    dec = Math.floor(dec / 3);
    // console.log(dec);
  }
  //   console.log(stack);
  while (stack.length != 0) {
    result += stack.pop();
  }
  return result;
};

const getResult = (x, inputValues) => {
  let isOk = false;
  //   console.log("x: " + x);
  //   console.log(inputValues);
  const n = inputValues.length - 1;
  for (let i = 0; i < 3 ** n; i++) {
    let ter = getTerciary(i);
    while (ter.length < n) {
      ter = "0" + ter;
    }
    // console.log(bin);
    let result = inputValues[0];
    for (let i = 0; i < ter.length; i++) {
      if (ter[i] === "0") {
        result = plus(result, inputValues[i + 1]);
      } else if (ter[i] === "1") {
        result = multipl(result, inputValues[i + 1]);
      } else {
        result = parseInt(result + "" + inputValues[i + 1]);
      }
    }
    // console.log(result);
    if (result === x) {
      console.log("heureka");
      isOk = true;
      break;
    }
  }
  return { isOk: isOk, okValue: x };
};

const solution = (filePath) => {
  let resultSum = 0;
  const data = getData(filePath);
  const processedData = processData(data);
  //   console.log(processedData);
  for (const x of processedData) {
    const result = getResult(x.testValue, x.inputValues);
    if (result.isOk) {
      resultSum += result.okValue;
    }
  }
  console.log(resultSum);
};

solution(FILE_PATH);
