import "./App.css";
import Keyboard from "./component/Keyboard/Keyboard";
import Main_Tiles from "./component/Main_Tiles/Main_Tiles";
import Alert from "./component/Alert/Alert";
import EndScreen from "./component/EndScreen/EndScreen";

import targetWords from "./dictionary/targetWords.json";
import dictionary from "./dictionary/dictionary.json";

import { useState, useEffect } from "react";

function App() {
  const STATUS = {
    ON_GOING: "ON_GOING",
    WON: "WON",
    LOST: "LOST",
  };

  const [gameStatus, setGameStatus] = useState(STATUS.ON_GOING);
  const WORD_LENGTH = 5;
  const [board, setBoard] = useState({
    targetWord: targetWords[Math.floor(Math.random() * targetWords.length)],
    rowIndex: 0,
    boardTiles: {}, // The whole board
    boardRowTileStatus: {}, // The status of the tile for each row. Green = correct , Yellow = Present , Dark_Grey = Wrong
    wrongCharArray: [], // List of letters that are wrong.
    presentCharArray: [], // List of letters that are present.
    correctCharArray: [], // List of letters that are correct. If a correct is found, remove it from present if it's in present. Mainly for the Keyboard
  });
  const [currentTileRow, setCurrentTileRow] = useState([]);
  const [alerts, setAlerts] = useState([]);

  function restartGame() {
    setBoard({
      targetWord: targetWords[Math.floor(Math.random() * targetWords.length)],
      rowIndex: 0,
      boardTiles: {},
      boardRowTileStatus: {},
      wrongCharArray: [],
      presentCharArray: [],
      correctCharArray: [],
    });

    setCurrentTileRow([]);
    setGameStatus(STATUS.ON_GOING);
  }

  function showAlert(message) {
    setAlerts([message, ...alerts]);
  }

  function submitGuess() {
    if (gameStatus === STATUS.ON_GOING) {
      if (!(currentTileRow.length === 5)) {
        showAlert("Not enough letters");
        return;
      }

      const currentWord = currentTileRow.join("").toLowerCase();
      if (!dictionary.includes(currentWord)) {
        showAlert("Word doesn't exist");
        return;
      }

      let newCorrectCharArray = [...board.correctCharArray];
      let newPresentCharArray = [...board.presentCharArray];
      let newWrongCharArray = [...board.wrongCharArray];
      let newBoardRowTileStatus = [];
      for (let index = 0; index < WORD_LENGTH; index++) {
        newBoardRowTileStatus.push("");
      }
      let copyCurrentTileRow = currentTileRow;
      let copyTargetWord = board.targetWord.split("");
      let arrayOfDeleteIndex = [];

      currentTileRow.forEach((tile, index) => {
        if (board.targetWord[index] === tile) {
          newBoardRowTileStatus.splice(index, 1, "correct");
          newCorrectCharArray.push(tile);
          arrayOfDeleteIndex.push(index);
        }
      });

      for (let i = arrayOfDeleteIndex.length - 1; i >= 0; i--) {
        copyCurrentTileRow.splice(arrayOfDeleteIndex[i], 1, "");
        copyTargetWord.splice(arrayOfDeleteIndex[i], 1, "");
      }

      copyCurrentTileRow.forEach((tile, index) => {
        if (!(tile === "")) {
          if (copyTargetWord.includes(tile)) {
            newBoardRowTileStatus.splice(index, 1, "present");
            newPresentCharArray.push(tile);
          } else {
            newBoardRowTileStatus.splice(index, 1, "wrong");
            newWrongCharArray.push(tile);
          }
        }
      });

      setBoard((prevValue) => {
        return {
          ...prevValue,
          correctCharArray: newCorrectCharArray,
          presentCharArray: newPresentCharArray,
          wrongCharArray: newWrongCharArray,
          rowIndex: prevValue.rowIndex + 1,
          boardRowTileStatus: {
            ...prevValue.boardRowTileStatus,
            [board.rowIndex]: newBoardRowTileStatus,
          },
        };
      });

      setCurrentTileRow([]);

      if (currentWord === board.targetWord) {
        setGameStatus(STATUS.WON);
        return;
      }

      if (board.rowIndex === 5) {
        setGameStatus(STATUS.LOST);
        return;
      }
    }
  }

  function deleteKey() {
    if (gameStatus === STATUS.ON_GOING) {
      if (!board.boardTiles[board.rowIndex]) {
        return;
      }

      const newBoardTilesRow = board.boardTiles[board.rowIndex].slice(
        0,
        board.boardTiles[board.rowIndex].length - 1
      );

      setBoard((prevValue) => {
        return {
          ...prevValue,
          boardTiles: {
            ...prevValue.boardTiles,
            [board.rowIndex]: newBoardTilesRow,
          },
        };
      });

      const newCurrentTitleRow = currentTileRow.slice(
        0,
        currentTileRow.length - 1
      );
      setCurrentTileRow(newCurrentTitleRow);
    }
  }

  function insertKey(key) {
    if (gameStatus === STATUS.ON_GOING) {
      if (!(currentTileRow.length === 5)) {
        setCurrentTileRow([...currentTileRow, key]);
        setBoard((prevValue) => {
          return {
            ...prevValue,
            boardTiles: {
              ...prevValue.boardTiles,
              [board.rowIndex]: [...currentTileRow, key],
            },
          };
        });
      }
    }
  }

  function handleKeyClicked(e) {
    if (gameStatus === STATUS.ON_GOING) {
      if (e.target.dataset.key_button === "Enter") {
        submitGuess();
        return;
      }

      if (e.target.dataset.key_button === "Delete") {
        deleteKey();
        return;
      }

      if (e.target.dataset.key_button.match(`^[A-Za-z]$`)) {
        insertKey(e.target.dataset.key_button.toLowerCase());
        return;
      }
    }
  }

  function handleKeyDown(e) {
    if (gameStatus === STATUS.ON_GOING) {
      if (e.key === "Enter") {
        submitGuess();
        return;
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        deleteKey();
        return;
      }

      if (e.key.match(`^[A-Za-z]$`)) {
        insertKey(e.key.toLowerCase());
        return;
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [board, alerts, currentTileRow]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (alerts[0]) {
        const newAlerts = alerts.slice(0, alerts.length - 1);
        setAlerts(newAlerts);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [alerts]);

  return (
    <div className="App">
      <Alert alerts={alerts} />
      <Main_Tiles board={board} />
      <Keyboard board={board} handleKeyClicked={handleKeyClicked} />
      <EndScreen gameStatus={gameStatus} restartGame={restartGame} />
    </div>
  );
}

export default App;
