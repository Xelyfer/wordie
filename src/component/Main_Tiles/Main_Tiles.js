import React from "react";
import "./Main_Tiles.css";

function Main_Tiles({ board }) {
  function renderTiles() {
    let tilesArray = [];
    const guesses = 6;
    const letterLimit = 5;

    for (let rows = 0; rows < guesses; rows++) {
      let rowArray = [];
      for (let i = 0; i < letterLimit; i++) {
        rowArray.push(
          <div
            className={`main-tiles-tile ${
              board.boardRowTileStatus[rows]
                ? board.boardRowTileStatus[rows][i] === "correct"
                  ? "correct"
                  : board.boardRowTileStatus[rows][i] === "present"
                  ? "wrong-location"
                  : "wrong"
                : ""
            }`}
            key={i}
          >
            {board.boardTiles[rows] ? board.boardTiles[rows][i] : ""}
          </div>
        );
      }
      tilesArray.push(rowArray);
    }

    return tilesArray;
  }

  return <div className="main-tiles">{renderTiles()}</div>;
}

export default Main_Tiles;
