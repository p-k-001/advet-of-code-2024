const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "input.txt");

const getData = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.log(err);
    return null;
  }
};
const getDataArr = (data) => {
  const arr = [];
  let row = [];
  let rowIndex = 0;
  let colIndex = 0;
  const result = { arr: arr, rowStart: 0, colStart: 0 };
  for (const char of data) {
    if (char === "^") {
      result.rowStart = rowIndex;
      result.colStart = colIndex;
    }
    if (char === "\r") {
      arr.push(row);
      rowIndex++;
      row = [];
      colIndex = 0;
      continue;
    }
    if (char === "\n") continue;
    row.push({ char: char, visited: false });
    colIndex++;
  }
  arr.push(row);
  return result;
};

const getNext = (rowStart, colStart, direction) => {
  if (direction === 0) {
    return { rowStart: rowStart - 1, colStart: colStart };
  }
  if (direction === 1) {
    return { rowStart: rowStart, colStart: colStart + 1 };
  }
  if (direction === 2) {
    return { rowStart: rowStart + 1, colStart: colStart };
  }
  if (direction === 3) {
    return { rowStart: rowStart, colStart: colStart - 1 };
  }
};

const directions = {
  0: "up",
  1: "right",
  2: "down",
  3: "left",
};

const solution = (filePath) => {
  const data = getData(filePath);
  console.log(data);
  let { arr, rowStart, colStart } = getDataArr(data);
  console.log(arr);
  console.log(rowStart);
  console.log(colStart);

  let direction = 0;
  let visited = 1;
  let isInArea = true;

  arr[rowStart][colStart].visited = true;

  while (isInArea) {
    ({ rowStart, colStart } = getNext(rowStart, colStart, direction));
    if (
      rowStart === arr.length ||
      rowStart === -1 ||
      colStart === arr[0].length ||
      colStart === -1
    ) {
      isInArea = false;
      break;
    }
    console.log("in while: rowStart; " + rowStart);
    console.log("in while: colStart; " + colStart);
    console.log("current char: " + arr[rowStart][colStart].char);
    if (arr[rowStart][colStart].char === "#") {
      // go back:
      ({ rowStart, colStart } = getNext(
        rowStart,
        colStart,
        (direction + 2) % 4
      ));
      direction = (direction + 1) % 4;
    } else {
      if (!arr[rowStart][colStart].visited) {
        arr[rowStart][colStart].visited = true;
        visited++;
      }
    }
  }
  console.log(visited);
};

solution(FILE_PATH);
