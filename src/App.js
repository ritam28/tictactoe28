import "./App.css";
import Tile from "./components/Tile";
import { useState, useEffect } from "react";

const winnerCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("O");
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState("");

  function checkWinner() {
    // console.log("player checkWinner", player);
    for (let i = 0; i < winnerCombination.length; i++) {
      const [a, b, c] = winnerCombination[i];
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a];
      }
    }
  }

  function resetScore() {
    setScore({ X: 0, O: 0 });
    playAgain();
  }

  function playAgain() {
    setWinner("");
    setPlayer("O");
    setGrid(Array(9).fill(""));
  }

  function tileClick(event) {
    // This is added to prevent overrider the current tile value
    if (grid[event.target.id] !== "" || winner !== "") return;

    // Create a new copy of the grid
    const newGrid = [...grid];
    // Update the Grid with the player
    newGrid[event.target.id] = player;

    // Set the updated Grid to the state
    setGrid(newGrid);

    // Change the player
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }

  useEffect(() => {
    const winnerCalc = checkWinner();
    if (winnerCalc) {
      setWinner(winnerCalc);
      setScore((prevScore) => {
        return { ...prevScore, [winnerCalc]: prevScore[winnerCalc] + 1 };
      });
      // alert(`Player ${winnerCalc} won the game`);
      console.log("winnerCalc", winnerCalc);
    }
  }, [grid]);

  // useEffect(() => {
  //   if (winner !== "") {
  //     // alert(`Player ${winner} won the game`);
  //   }
  // }, [score]);

  return (
    <>
      <div className="container">
        <div className="result blink_me">
          {/* <i className="fas fa-long-arrow-alt-left"></i>
          <i className="fas fa-volume-up"></i> */}
          {winner !== "" ? "Player " + winner + " won the game" : ""}
        </div>
        <div id="part2">
          <div id="player1" className="player">
            <p>Player 1</p>
            <div className="red grid-item">X</div>
          </div>
          <div id="score">
            <p>
              {score.X}
              <span>/</span>
              {score.O}
            </p>
            <p></p>
          </div>
          <div id="player2" className="player">
            <p>Player 2</p>
            <div className="green grid-item">O</div>
          </div>
        </div>
        <div id="part3">
          <div className="grid-container">
            <Tile id="0" label={grid[0]} clickEvent={tileClick} />
            <Tile id="1" label={grid[1]} clickEvent={tileClick} />
            <Tile id="2" label={grid[2]} clickEvent={tileClick} />
          </div>
          <div className="grid-container">
            <Tile id="3" label={grid[3]} clickEvent={tileClick} />
            <Tile id="4" label={grid[4]} clickEvent={tileClick} />
            <Tile id="5" label={grid[5]} clickEvent={tileClick} />
          </div>
          <div className="grid-container">
            <Tile id="6" label={grid[6]} clickEvent={tileClick} />
            <Tile id="7" label={grid[7]} clickEvent={tileClick} />
            <Tile id="8" label={grid[8]} clickEvent={tileClick} />
          </div>
        </div>
        <div id="part4">
          <div className="button">
            <button className=" btn-reset" onClick={resetScore}>
              RESET SCORE
            </button>
            <button className=" btn-again" onClick={playAgain}>
              PLAY AGAIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
