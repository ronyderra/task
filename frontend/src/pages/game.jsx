import { useState } from "react";
import Square from "../components/square/Square";
import PopUp from "../components/PopUp";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../helpers/congig";
import { useNavigate } from "react-router-dom";
import { setPlayAgainst, setXorO } from "../store/reducer/user";
import Api from "../helpers/api";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);
  const { playAgainst, xOrO, userName } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  socket.on(userName, async data => {
    const resp = JSON.parse(data);
    console.log(resp);
    if (resp.event === "game") {
      squares[resp.ind] = resp.xOrO;
      setSquares(squares);
      setTurn(xOrO);
      const W = checkWinner();
      if (W) {
        if (W === xOrO) await Api.addWin(userName);
        setWinner(W);
      } else if (checkEndTheGame()) {
        setWinner("x | o");
      }
    }
  });

  const updateSquares = async ind => {
    if (turn === xOrO) {
      socket.emit("moved", JSON.stringify({ userName, playAgainst, ind, xOrO }));
      if (squares[ind] || winner) {
        return;
      }
      squares[ind] = turn;
      setSquares(squares);
      setTurn(turn === "x" ? "o" : "x");
      const W = checkWinner();
      if (W) {
        console.log({ W, xOrO });
        if (W === xOrO) await Api.addWin(userName);
        dispatch(setPlayAgainst(""));
        setWinner(W);
      } else if (checkEndTheGame()) {
        setWinner("x | o");
      }
    }
  };

  const handleTolobby = () => {
    socket.emit("enteredLobby", userName);
    navigate("/lobby");
  };

  return (
    <div className="tic-tac-toe">
      <div className="game">
        {Array.from("012345678").map(ind => (
          <Square key={ind} ind={ind} updateSquares={updateSquares} clsName={squares[ind]} />
        ))}
      </div>
      <div className={`turn ${turn === "x" ? "left" : "right"}`}>
        <Square clsName="x" />
        <Square clsName="o" />
      </div>
      {turn === xOrO ? (
        <span className="turnText">"YOR TURN"</span>
      ) : (
        <span className="turnText">"Wait..."</span>
      )}
      {winner && (
        <PopUp
          title={winner === xOrO ? "You Win!!" : "Try again?"}
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
          bodyCls={"win"}
          btnText={"To Lobby"}
          btnFunc={() => handleTolobby()}
        />
      )}
    </div>
  );
}

export default Game;

// const resetGame = () => {
//   setSquares(Array(9).fill(""));
//   setTurn("x");
//   setWinner(null);
// };
