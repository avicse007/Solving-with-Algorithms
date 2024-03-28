export default {
  check,
  lookup,
};

var elements;
var symbols = {};

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
  elements = await (await fetch("periodic-table.json")).json();

  //construct lookup table or indexes for our periodic table look up
  for (const ele of elements) {
    symbols[ele.symbol.toLowerCase()] = ele;
  }
}

// build candidate of two-letter and one-letter possible symbols
function buildCandidate(inputWord) {
  let oneWordCandidate = []; // use array as order matters
  let toWordCandidate = [];
  for (let i = 0; i < inputWord.length; i++) {
    if (inputWord[i] in symbols && !oneWordCandidate.includes(inputWord[i])) {
      oneWordCandidate.push(inputWord[i]);
    }
    if (i <= inputWord.length - 2) {
      const twoWord = inputWord.slice(i, i + 2);
      if (twoWord in symbols && !toWordCandidate.includes(twoWord)) {
        toWordCandidate.push(twoWord);
      }
    }
  }
  return [...toWordCandidate, ...oneWordCandidate];
}

function check(inputWord) {
  //   // TODO: determine if `inputWord` can be spelled
  //   // with periodic table symbols; return array with
  //   // them if so (empty array otherwise)
  //   let res = [];
  //   if (inputWord.length > 0) {
  //     for (const ele of elements) {
  //       const symbol = ele.symbol.toLowerCase();
  //       //if symbol is size is in range of inpuut
  //       if (symbol.length <= inputWord.length) {
  //         //if the symbol match if first few character of input
  //         if (symbol == inputWord.slice(0, symbol.length)) {
  //           //still have characters left
  //           if (inputWord.length > symbol.length) {
  //             let res = check(inputWord.slice(symbol.length));
  //             // matched successfully?
  //             if (res.length > 0) {
  //               return [symbol, ...res];
  //             }
  //           } else {
  //             return [symbol];
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return [];
  //second-option to solve this problem
  let candidate = buildCandidate(inputWord);
  return spellWord(candidate, inputWord);
}

function spellWord(candidate, inputWord) {
  if (inputWord.length == 0) {
    return [];
  } else {
    //check two letter words first
    if (inputWord.length >= 2) {
      let two = inputWord.slice(0, 2);
      let rest = inputWord.slice(2);
      //if candidate matched
      if (candidate.includes(two)) {
        //check if we have more work
        if (rest.length > 0) {
          let result = spellWord(candidate, rest);
          if (result && result.join("") == rest) {
            return [two, ...result];
          }
        } //else no more work return the result
        else {
          return [two];
        }
      }
    } //check for one letter
    if (inputWord.length >= 1) {
      let oneChar = inputWord[0];
      let rest = inputWord.slice(1);
      if (candidate.includes(oneChar)) {
        if (rest.length > 0) {
          let result = spellWord(candidate, rest);
          if (result && result.join("") == rest) {
            return [oneChar, ...result];
          }
        } else {
          return [oneChar];
        }
      }
    }
  }
  return [];
}

function lookup(elementSymbol) {
  return symbols[elementSymbol];
}
