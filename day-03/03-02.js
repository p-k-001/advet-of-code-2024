const fs = require("fs");
const path = require("path");

const INPUT_PATH = path.join(__dirname, "input.txt");

const getData = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.log(err);
    return null;
  }
};

const solution = () => {
  const data = getData(INPUT_PATH);
  let dont = false;
  const regexp = /mul\((\d{1,3}),(\d{1,3})\)|(don't\(\))|(do\(\))/gm;
  let result = 0;
  for (const x of data.matchAll(regexp)) {
    console.log(x[1], x[2], x[3], x[4]);
    if (x[3]) dont = true;
    if (x[4]) dont = false;
    if (!dont && x[1] && x[2]) result += parseInt(x[1]) * parseInt(x[2]);
  }
  console.log(result);
  return result;
};

solution();
