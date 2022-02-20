import React from "react";
import "./Keyboard.css";
import Keyboard_Keys from "./Keyboard_Keys.json";

function Keyboard() {
  return (
    <div className="keyboard">
      {Keyboard_Keys.map((key, index) => {
        {
          return key.Key === "Empty" ? (
            <div className="keyboard-space" key={index}></div>
          ) : key.TYPE === "KEY_LARGE" ? (
            <button
              className="keyboard-key large"
              key={index}
              key-type={key.TYPE}
            >
              {key.Key}
            </button>
          ) : (
            <button className="keyboard-key" key={index} key-type={key.TYPE}>
              {key.Key}
            </button>
          );
        }
      })}
    </div>
  );
}
export default Keyboard;
