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

const getResult = (x, inputValues) => {
  let isOk = false;
  //   console.log("x: " + x);
  //   console.log(inputValues);
  const n = inputValues.length - 1;
  for (let i = 0; i < 2 ** n; i++) {
    let bin = getBinary(i);
    while (bin.length < n) {
      bin = "0" + bin;
    }
    // console.log(bin);
    let result = inputValues[0];
    for (let i = 0; i < bin.length; i++) {
      if (bin[i] === "0") {
        result = plus(result, inputValues[i + 1]);
      } else {
        result = multipl(result, inputValues[i + 1]);
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
