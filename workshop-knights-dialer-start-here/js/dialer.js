export default {
  reachableKeys,
  countPaths,
  listAcyclicPaths,
};

//countPaths = memoize(countPaths);

// ****************************

var dialpad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [, 0, 0],
];

var nearbyKeys = [
  [4, 6],
  [6, 8],
  [7, 9],
  [4, 8],
  [3, 9, 0],
  [],
  [1, 7, 0],
  [2, 6],
  [1, 3],
  [2, 4],
];

function reachableKeys(startingDigit) {
  //This code is brute force
  //   var nearbyKeys = [];
  //   for (let [rowIdx, row] of dialpad.entries()) {
  //     let colIdx = row.indexOf(startingDigit);
  //     if (colIdx != -1) {
  //       for (let rowMove of [-2, -1, 1, 2]) {
  //         for (let colMove of [-2, -1, 1, 2]) {
  //           if (Math.abs(rowMove) != Math.abs(colMove)) {
  //             if (
  //               rowIdx + rowMove >= 0 &&
  //               rowIdx + rowMove <= 3 &&
  //               colIdx + colMove >= 0 &&
  //               colIdx + colMove <= 2 &&
  //               dialpad[rowIdx + rowMove][colIdx + colMove] != undefined
  //             ) {
  //               nearbyKeys.push(dialpad[rowIdx + rowMove][colIdx + colMove]);
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return nearbyKeys;
  return nearbyKeys[startingDigit];
}

function countPaths(startingDigit, hopCount) {
  // TODO: given the digit/key to start from and
  // the number of hops to take, return a count
  // of all the possible paths that could be
  // traversed
  if (hopCount == 0) return 1;
  var pathCount = 0;
  //   for (const point of nearbyKeys[startingDigit]) {
  //     pathCount += countPaths(point, hopCount - 1);
  //   }
  var priorPathCount = Array(10).fill(1);
  for (let hops = 0; hops < hopCount; hops++) {
    let pathCount = Array(10).fill(0);
    for (let digits = 0; digits <= 9; digits++) {
      for (let n of nearbyKeys[digits]) {
        pathCount[digits] += priorPathCount[n];
      }
    }
    priorPathCount = pathCount;
  }
  return priorPathCount[startingDigit];
  //return pathCount;
}

function listAcyclicPaths(startingDigit) {
  // TODO: given the digit/key to start from,
  // return a list of the distinct acyclic
  // paths that are possible to traverse
  //
  // e.g. [
  //   [4, 3, 8, 1, 6, 7, 2, 9],
  //   [4, 3, 8, 1, 6, 0],
  //   ...
  // ]
  var paths = [];
  var nextHops = nearbyKeys[startingDigit];
  for (const hop of nextHops) {
    let path = [startingDigit, hop];
    followPaths(path, paths);
  }
  return paths;
}

function followPaths(path, paths) {
  var nextHops = nearbyKeys[path[path.length - 1]];
  var pathForwardFound = false;
  for (const hop of nextHops) {
    if (!path.includes(hop)) {
      pathForwardFound = true;
      let nextPath = [...path, hop];
      followPaths(nextPath, paths);
    }
  }
  if (!pathForwardFound) {
    paths.push(path);
  }
}

// function memoize(fn) {
//   let cache = {};
//   return function memoized(start, length) {
//     if (!cache[`${start}:${length}`]) {
//       cache[`${start}:${length}`] = fn(start, length);
//     }
//     return cache[`${start}:${length}`];
//   };
// }
