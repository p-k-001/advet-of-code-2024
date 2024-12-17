const fs = require("fs");
const path = require("path");

const INPUT_PATH = path.join(__dirname, "./input.txt");

const getData = () => {
  try {
    return fs.readFileSync(INPUT_PATH, "utf-8");
  } catch (err) {
    console.log(err);
    return null;
  }
};

const isSafe = (arr) => {
  if (arr.length === 1) return true;
  if (arr[0] - arr[1] === 0) return false;
  const trend = arr[0] - arr[1] > 0 ? "desc" : "asc";
  const isValidDiff = (a, b) => Math.abs(a - b) >= 1 && Math.abs(a - b) <= 3;

  for (let i = 0; i < arr.length - 1; i++) {
    if (!isValidDiff(arr[i], arr[i + 1])) return false;
    if (trend === "desc" && arr[i] <= arr[i + 1]) return false;
    if (trend === "asc" && arr[i] >= arr[i + 1]) return false;
  }
  return true;
};

const solution = () => {
  const data = getData();
  let result = 0;

  const lines = data.split("\r\n");
  // console.log(lines);

  for (const line of lines) {
    const curr = line.split(" ");
    const parsed = [];
    curr.forEach((x) => {
      parsed.push(parseInt(x));
    });
    // console.log(parsed);
    // console.log(isSafe(parsed));
    if (isSafe(parsed)) {
      result++;
    }
  }
  console.log(result);
  return result;
};

solution();
