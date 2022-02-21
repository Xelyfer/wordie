import React from "react";
import "./Main_Tiles.css";

function Main_Tiles() {
  function renderTiles() {
    var tiles = 30;
    let tilesArray = [];
    for (let i = 0; i < tiles; i++) {
      tilesArray.push(<div className="main-tiles-tile"></div>);
    }
    return tilesArray;
  }

  return <div className="main-tiles">{renderTiles()}</div>;
}

export default Main_Tiles;
