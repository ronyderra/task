import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "../components/Button";
import Square from "../components/Square";
import PopUp from "../components/PopUp";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);

  const checkEndTheGame = () => {
    for (let square of squares) {
      if (!square) return false;
    }
    return true;
  };

  const checkWinner = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const updateSquares = ind => {
    if (squares[ind] || winner) {
      return;
    }
    const s = squares;
    s[ind] = turn;
    setSquares(s);
    setTurn(turn === "x" ? "o" : "x");
    const W = checkWinner();
    if (W) {
      setWinner(W);
    } else if (checkEndTheGame()) {
      setWinner("x | o");
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe">
      <h1> TIC-TAC-TOE </h1>
      <Button resetGame={resetGame} />
      <div className="game">
        {Array.from("012345678").map(ind => (
          <Square key={ind} ind={ind} updateSquares={updateSquares} clsName={squares[ind]} />
        ))}
      </div>
      <div className={`turn ${turn === "x" ? "left" : "right"}`}>
        <Square clsName="x" />
        <Square clsName="o" />
      </div>
      {winner && (
        <PopUp
          title={winner === "x | o" ? "No Winner :/" : "Win !! :)"}
          body={
            winner === "x | o" ? (
              <>
                <Square clsName="x" />
                <Square clsName="o" />
              </>
            ) : (
              <>
                <Square clsName={winner} />
              </>
            )
          }
          btnText={"New Game"}
          btnFunc={resetGame}
        />
      )}
    </div>
  );
}

export default Game;
