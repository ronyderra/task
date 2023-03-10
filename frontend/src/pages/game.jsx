import { useState } from "react";
import Square from "../components/square/Square";
import PopUp from "../components/PopUp";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../helpers/config";
import { useNavigate } from "react-router-dom";
import { setPlayAgainst } from "../store/reducer/user";
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

  socket.on(userName, async data => {
    const resp = JSON.parse(data);
    if (resp.event === "game") {
      squares[resp.ind] = resp.xOrO;
      setSquares(squares);
      setTurn(xOrO);
      await handleRes();
    }
  });

  const handleRes = async () => {
    const W = await Api.checkWinner(squares);
    if (W.result) {
      if (W.result === xOrO) await Api.addWin(userName);
      dispatch(setPlayAgainst(""));
      setWinner(W.result);
    } else if (checkEndTheGame()) {
      setWinner("x | o");
    }
  };

  const updateSquares = async ind => {
    if (turn === xOrO) {
      socket.emit("moved", JSON.stringify({ userName, playAgainst, ind, xOrO }));
      if (squares[ind] || winner) return;
      squares[ind] = turn;
      setSquares(squares);
      setTurn(turn === "x" ? "o" : "x");
      await handleRes();
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