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
    row.push({
      char: char,
      visited: false,
      isVertex: false,
      inDirection: null,
      outDirection: null,
    });
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

const isDataCycled = (arr, rowStart, colStart) => {
  //   console.log(data);
  //   let { arr, rowStart, colStart } = getDataArr(data);
  //   console.log(arr);
  //   console.log(rowStart);
  //   console.log(colStart);

  let direction = 0;
  let visitedCount = 1;
  let isInArea = true;
  let isCycle = false;

  arr[rowStart][colStart].visited = true;

  while (isInArea && !isCycle) {
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

    // console.log("in while: rowStart; " + rowStart);
    // console.log("in while: colStart; " + colStart);
    // console.log("current char: " + arr[rowStart][colStart].char);

    //check cycle:
    if (
      arr[rowStart][colStart].isVertex &&
      arr[rowStart][colStart].inDirection === direction
    ) {
      console.log("********** CYCLE **********");
      isCycle = true;
    }

    arr[rowStart][colStart].inDirection = direction;

    if (
      arr[rowStart][colStart].char === "#" ||
      arr[rowStart][colStart].char === "O"
    ) {
      // go back:
      ({ rowStart, colStart } = getNext(
        rowStart,
        colStart,
        (direction + 2) % 4
      ));

      arr[rowStart][colStart].isVertex = true;
      direction = (direction + 1) % 4;
    } else {
      if (!arr[rowStart][colStart].visited) {
        arr[rowStart][colStart].visited = true;
        visitedCount++;
      }
    }

    arr[rowStart][colStart].outDirection = direction;
    // console.log(
    //   `${rowStart} ${colStart} - ${arr[rowStart][colStart].isVertex} in: ${arr[rowStart][colStart].inDirection} out: ${arr[rowStart][colStart].outDirection}`
    // );
  }
  //console.log(visitedCount);
  return isCycle;
};

const drawArr = (arr) => {
  let currentRow = "";
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[0].length; col++) {
      currentRow += arr[row][col].char;
    }
    console.log(currentRow);
    currentRow = "";
  }
};

const solution = (filePath) => {
  const data = getData(filePath);
  let { arr, rowStart, colStart } = getDataArr(data);

  let cylceCount = 0;

  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[0].length; col++) {
      console.log(`${row} x ${col}`);
      if (arr[row][col].char === ".") {
        arr[row][col].char = "O";
      }
      //   drawArr(arr);
      console.log("------------------------");
      if (isDataCycled(arr, rowStart, colStart)) {
        cylceCount++;
      }
      ({ arr, rowStart, colStart } = getDataArr(data));
    }
  }
  console.log("cylceCount: " + cylceCount);
};

solution(FILE_PATH);

// const data = getData(FILE_PATH);
// let { arr, rowStart, colStart } = getDataArr(data);
// isDataCycled(arr, rowStart, colStart);
