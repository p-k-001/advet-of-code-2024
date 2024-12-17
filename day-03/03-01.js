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
  const regexp = /mul\((\d{1,3}),(\d{1,3})\)/gm;
  let result = 0;
  for (const x of data.matchAll(regexp)) {
    result += parseInt(x[1]) * parseInt(x[2]);
  }
  console.log(result);
  return result;
};

solution();
