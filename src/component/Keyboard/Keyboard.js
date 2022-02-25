import React from "react";
import "./Keyboard.css";
import Keyboard_Keys from "./Keyboard_Keys.json";

function Keyboard({ board, handleKeyClicked }) {
  return (
    <div className="keyboard">
      {Keyboard_Keys.map((key, index) => {
        {
          return key.Key === "Empty" ? (
            <div className="keyboard-space" key={index}></div>
          ) : (
            <button
              className={`keyboard-key ${
                key.TYPE === "KEY_LARGE" ? "large" : ""
              } ${
                board.correctCharArray?.includes(key.Key.toLowerCase())
                  ? "correct"
                  : board.presentCharArray?.includes(key.Key.toLowerCase())
                  ? "wrong-location"
                  : board.wrongCharArray?.includes(key.Key.toLowerCase())
                  ? "wrong"
                  : ""
              }`}
              key={index}
              data-key_button={key.Key}
              onClick={(e) => handleKeyClicked(e)}
            >
              {key.Key}
            </button>
          );
        }
      })}
    </div>
  );
}
export default Keyboard;
