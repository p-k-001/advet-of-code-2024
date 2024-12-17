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

const getMatrix = (data) => {
  const matrix = [];
  let row = [];
  let i = 0;
  for (const x of data) {
    if (x === "\r") {
      matrix.push(row);
      row = [];
    } else if (x === "\n") continue;
    else row.push(x);
  }
  matrix.push(row);
  //   console.log(matrix);
  return matrix;
};

const isInBounds = (matrix, row, col) => {
  return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
};

const findCrossMax = (matrix, startRow, startCol) => {
  let rightUp = false,
    rightDown = false,
    leftUp = false,
    leftDown = false,
    result = false;
  if (matrix[startRow][startCol] === "A") {
    // rightUp
    if (
      isInBounds(matrix, startRow + 1, startCol - 1) &&
      isInBounds(matrix, startRow - 1, startCol + 1) &&
      matrix[startRow + 1][startCol - 1] === "M" &&
      matrix[startRow - 1][startCol + 1] === "S"
    )
      rightUp = true;
    // rightDown
    if (
      isInBounds(matrix, startRow - 1, startCol - 1) &&
      isInBounds(matrix, startRow + 1, startCol + 1) &&
      matrix[startRow - 1][startCol - 1] === "M" &&
      matrix[startRow + 1][startCol + 1] === "S"
    )
      rightDown = true;
    // leftUp
    if (
      isInBounds(matrix, startRow + 1, startCol + 1) &&
      isInBounds(matrix, startRow - 1, startCol - 1) &&
      matrix[startRow + 1][startCol + 1] === "M" &&
      matrix[startRow - 1][startCol - 1] === "S"
    )
      leftUp = true;
    // leftDown
    if (
      isInBounds(matrix, startRow - 1, startCol + 1) &&
      isInBounds(matrix, startRow + 1, startCol - 1) &&
      matrix[startRow - 1][startCol + 1] === "M" &&
      matrix[startRow + 1][startCol - 1] === "S"
    )
      leftDown = true;

    if (
      (rightUp && rightDown) ||
      (rightUp && leftUp) ||
      (rightDown && leftDown) ||
      (leftUp && leftDown)
    ) {
      result = true;
    }
  }

  return result;
};

const solution = () => {
  let result = 0;
  const matrix = getMatrix(getData(FILE_PATH));
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (findCrossMax(matrix, row, col)) result++;
    }
  }
  console.log(result);
  return result;
};
solution();
