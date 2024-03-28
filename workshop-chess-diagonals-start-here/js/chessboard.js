export default {
  draw,
  highlight,
};

var tiles = [];

// ****************************

function draw(boardEl) {
  // TODO: draw the chessboard, 8 rows (divs)
  // of 8 tiles (divs) each, inserting all DOM
  // elements into `boardEl` div
  for (let i = 0; i < 8; i++) {
    let rowEl = document.createElement("div");
    let rowTiles = [];
    tiles.push(rowTiles);
    for (let j = 0; j < 8; j++) {
      let tileEl = document.createElement("div");
      tileEl.dataset.row = i;
      tileEl.dataset.col = j;
      rowEl.append(tileEl);
      rowTiles.push(tileEl);
    }
    boardEl.append(rowEl);
  }
  //tiles = boardEl.querySelectorAll("div > div");
}

function highlight(tileEl) {
  // TODO: clear previous highlights (if any) and
  // then find the tiles in the two diagonals
  // (major and minor) that `tileEl` belongs to,
  // to highlight them via CSS class "highlighted"
  //let clear all the highlighted tiles first
  //   for (let tile of tiles) {
  //     tile.classList.remove("highlighted");
  //   }
  for (let row of tiles) {
    for (let el of row) {
      el.classList.remove("highlighted");
    }
  }

  if (tileEl) {
    //Get the index of tiles that is clicked
    //let rowEl = tileEl.parentNode;
    //let boardEl = rowEl.parentNode;
    let tileRowIdx = Number(tileEl.dataset.row); //[...boardEl.childNodes].indexOf(rowEl);
    let tileColIdx = Number(tileEl.dataset.col); //[...rowEl.childNodes].indexOf(tileEl);

    //highlighting the up-left direction
    for (let i = tileRowIdx, j = tileColIdx; i >= 0 && j >= 0; i--, j--) {
      let el = tiles[i][j];
      el.classList.add("highlighted");
    }

    //highlighting the up-right direction
    for (let i = tileRowIdx, j = tileColIdx; i >= 0 && j < 8; i--, j++) {
      let el = tiles[i][j];
      el.classList.add("highlighted");
    }

    //highlighting the down-left direction
    for (let i = tileRowIdx, j = tileColIdx; i < 8 && j >= 0; i++, j--) {
      let el = tiles[i][j];
      el.classList.add("highlighted");
    }

    //highlighting the down-right direction
    for (let i = tileRowIdx, j = tileColIdx; i < 8 && j < 8; i++, j++) {
      let el = tiles[i][j];
      el.classList.add("highlighted");
    }
  }
}

// function findTile(row, col) {
//   //   return document.querySelector(
//   //     `#board > div:nth-child(${row + 1}) > div:nth-child(${col + 1})`
//   //   );
//   //   for (const ele of tiles) {
//   //     if (ele.dataset.row == row && ele.dataset.col == col) {
//   //       return ele;
//   //     }
//   //   }
//   return tiles[row][col];
// }
