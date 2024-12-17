const fs = require("fs");
const fsp = fs.promises;
const path = require("path");

const INPUT_FILE_PATH = path.join(__dirname, "./input.txt");

const getDataSync = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.log(err);
    return null;
  }
};

const solution = () => {
  const data = getDataSync(INPUT_FILE_PATH);
  const left = new Map();
  const right = new Map();
  result = 0;
  data.split("\r\n").forEach((item) => {
    const tmp = item.split("   ");

    left.set(parseInt(tmp[0]), (left.get(parseInt(tmp[0])) || 0) + 1);
    right.set(parseInt(tmp[1]), (right.get(parseInt(tmp[1])) || 0) + 1);
  });

  for (key of left.keys()) {
    result += key * left.get(key) * (right.get(key) || 0);
  }
  console.log(result);
  return result;
};

solution();
