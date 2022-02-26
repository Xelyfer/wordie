import React, { useState, useEffect } from "react";
import "./EndScreen.css";

function EndScreen({ gameStatus, restartGame }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (gameStatus !== "ON_GOING") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [gameStatus]);

  return (
    <div className={`end-screen ${!show ? "end-screen-hide" : ""}`}>
      <div className="end-screen-background"></div>
      <div className="end-screen-alert">
        <h1>{gameStatus === "WON" ? "You have won." : "You have lost."}</h1>
        <p>
          {gameStatus === "WON"
            ? "Congratulations. You have a big brain."
            : "Unfortunately you need to buy a bigger brain."}
        </p>
        <button
          onClick={(e) => {
            restartGame();
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default EndScreen;
