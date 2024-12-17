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

const findWord = (matrix, startRow, startCol, word) => {
  let count = 0;
  let right = true,
    left = true,
    up = true,
    down = true,
    rightUp = true,
    rightDown = true,
    leftUp = true,
    leftDown = true;
  if (matrix[startRow][startCol] != word[0]) return 0;
  for (let i = 1; i < word.length; i++) {
    // right
    if (
      !isInBounds(matrix, startRow, startCol + i) ||
      matrix[startRow][startCol + i] != word[i]
    )
      right = false;
    // left
    if (
      !isInBounds(matrix, startRow, startCol - i) ||
      matrix[startRow][startCol - i] != word[i]
    )
      left = false;
    // up
    if (
      !isInBounds(matrix, startRow - i, startCol) ||
      matrix[startRow - i][startCol] != word[i]
    )
      up = false;
    // down
    if (
      !isInBounds(matrix, startRow + i, startCol) ||
      matrix[startRow + i][startCol] != word[i]
    )
      down = false;
    // rightUp
    if (
      !isInBounds(matrix, startRow - i, startCol + i) ||
      matrix[startRow - i][startCol + i] != word[i]
    )
      rightUp = false;
    // rightDown
    if (
      !isInBounds(matrix, startRow + i, startCol + i) ||
      matrix[startRow + i][startCol + i] != word[i]
    )
      rightDown = false;
    // leftUp
    if (
      !isInBounds(matrix, startRow - i, startCol - i) ||
      matrix[startRow - i][startCol - i] != word[i]
    )
      leftUp = false;
    // leftDown
    if (
      !isInBounds(matrix, startRow + i, startCol - i) ||
      matrix[startRow + i][startCol - i] != word[i]
    )
      leftDown = false;
  }
  if (right) count++;
  if (left) count++;
  if (up) count++;
  if (down) count++;
  if (rightUp) count++;
  if (rightDown) count++;
  if (leftUp) count++;
  if (leftDown) count++;
  //   console.log(startRow, startCol, count);
  return count;
};

const solution = () => {
  let result = 0;
  const matrix = getMatrix(getData(FILE_PATH));
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      //   console.log(matrix[row][col]);
      //   tmp = findWord(matrix, row, col, "XMAS");
      //   for (let i = 0; i < tmp; i++) {
      //     console.log(row, col);
      //   }

      result += findWord(matrix, row, col, "XMAS");
    }
  }
  console.log(result);
  return result;
};
solution();
