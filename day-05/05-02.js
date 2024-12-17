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

const createInputStructures = (data) => {
  const predecessorsMap = new Map();
  const listOfUpdates = new Array();

  const regPairs = /(\d+)\|(\d+)/gm;
  for (const x of data.matchAll(regPairs)) {
    // console.log(x[1], x[2]);
    // predecessorsMap.get(x[1])
    //   ? predecessorsMap.set(x[1], predecessorsMap.get(x[1]).add(x[2]))
    //   : predecessorsMap.set(x[1], new Set([x[2]]));

    predecessorsMap.set(
      parseInt(x[1]),
      (predecessorsMap.get(parseInt(x[1])) || new Set()).add(parseInt(x[2]))
    );
  }
  //   console.log(predecessorsMap);

  const regList = /^[^\|\r\n]+$/gm;
  for (const x of data.match(regList)) {
    const tmp = [];
    for (const y of x.matchAll(/(\d+)/gm)) {
      tmp.push(parseInt(y[1]));
    }
    listOfUpdates.push(tmp);
  }
  //   console.log(listOfUpdates);
  return { pairs: predecessorsMap, updates: listOfUpdates };
};

const getMiddleOfCorrectedRow = (incorrectRowArray, pairs) => {
  let correctionMade = true;
  let tmpArr = incorrectRowArray;

  const switchItems = (arr, i, j) => {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  while (correctionMade) {
    correctionMade = false;
    for (let col = 0; col < tmpArr.length - 1; col++) {
      for (let k = col + 1; k < tmpArr.length; k++) {
        if (pairs.get(tmpArr[k])) {
          if (pairs.get(tmpArr[k]).has(tmpArr[col])) {
            switchItems(tmpArr, k, col);
            correctionMade = true;
          }
        }
      }
    }
  }
  return tmpArr[Math.floor(tmpArr.length / 2)];
};

const solution = () => {
  const data = getData(FILE_PATH);

  const { pairs, updates } = createInputStructures(data);
  console.log(pairs);
  console.log(updates);

  let isOk = true;
  let result = 0;

  for (let row = 0; row < updates.length; row++) {
    isOk = true;
    for (let col = 0; col < updates[row].length - 1; col++) {
      if (!isOk) break;
      console.log("row: " + row);
      console.log("col: " + col);
      for (let k = col + 1; k < updates[row].length; k++) {
        console.log("updates[row][k]: " + updates[row][k]);
        console.log("updates[row][col]: " + updates[row][col]);
        if (pairs.get(updates[row][k])) {
          console.log(pairs.get(updates[row][k]));
          console.log(pairs.get(updates[row][k]).has(updates[row][col]));
          if (pairs.get(updates[row][k]).has(updates[row][col])) {
            isOk = false;
            console.log("****need to be repaired");
            // print incorrect row:
            let incorrectRow = [];
            for (let i = 0; i < updates[row].length; i++) {
              incorrectRow.push(updates[row][i]);
            }
            console.log("******* incorrect row: " + incorrectRow + "*******");

            result += getMiddleOfCorrectedRow(incorrectRow, pairs);
            console.log("partial result: " + result);
            break;
          }
        }
      }
    }
    console.log("middle index: " + Math.floor(updates[row].length / 2));
    console.log(
      "middle value: " + updates[row][Math.floor(updates[row].length / 2)]
    );
    // if (isOk) result += updates[row][Math.floor(updates[row].length / 2)];
    // console.log("result: " + result);
  }

  return result;
};

solution();
