const fs = require("fs");
const fsp = fs.promises;
const path = require("path");

const INPUT_FILE_PATH = path.join(__dirname, "input.txt");

// const getDataAsync = async (filePath) => {
//   try {
//     return await fsp.readFile(filePath, "utf-8");
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };

// (async () => {
//   const data = await getDataAsync(INPUT_FILE_PATH);
//   console.log(data);
// })();
// getDataAsync(INPUT_FILE_PATH).then((data) => {
//   console.log(data);
// });

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
  const left = [];
  const right = [];
  result = 0;
  data.split("\r\n").forEach((item) => {
    const tmp = item.split("   ");
    left.push(tmp[0]);
    right.push(tmp[1]);
  });
  left.sort();
  right.sort();
  for (let i = 0; i < left.length; i++) {
    result += Math.abs(left[i] - right[i]);
  }
  console.log(result);
  return result;
};

solution();
