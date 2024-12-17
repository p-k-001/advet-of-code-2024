const row = "3267: 81 40 27";
let testValue = "";
let inputValues = [];
const processRow = (row) => {
  const pattern = /(\d+)/g;
  const arr = [...row.matchAll(pattern)];
  testValue = parseInt(arr[0][1]);
  for (let i = 1; i < arr.length; i++) {
    inputValues.push(parseInt(arr[i][1]));
  }
  return { testValue: testValue, inputValues: inputValues };
};

const a = [1];
// 12, 3, 4
// 1, 23, 4
// 1, 2, 34
const getConcatInputs = (arr) => {
  let result = [];
  let tmp = [];
  for (let i = 0; i < arr.length - 1; i++) {
    tmp = arr.slice(0, i);
    tmp.push(parseInt(arr[i] + "" + arr[i + 1]));
    tmp = tmp.concat(arr.slice(i + 2, arr.length));
    result.push(tmp);
  }
  return result;
};

const getTerciary = (dec) => {
  const stack = [];
  let result = "";
  while (dec != 0) {
    stack.push(dec % 3);
    dec = Math.floor(dec / 3);
    console.log(dec);
  }
  console.log(stack);
  while (stack.length != 0) {
    result += stack.pop();
  }
  return parseInt(result);
};

console.log(getTerciary(21));
