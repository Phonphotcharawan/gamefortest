import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Box from "../components/Box";

export const BotComponent = () => {
  const [boxs, setBoxs] = useState(["", "", "", "", "", "", "", "", ""]);
  const [winningMsg, setWinningMsg] = useState(null);
  const [drawMsg, setDrawMsg] = useState(null);
  const [go, setGo] = useState("circle");
  const [score, setScore] = useState(0);
  const [scoreCombo, setScoreCombo] = useState(0);
  const [scoreUpdated, setScoreUpdated] = useState(false);
  const checkScore = () => {
    const winningCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let userWin = false;
    let crossWin = false;

    winningCombo.forEach((arr) => {
      if (arr.every((box) => boxs[box] === "circle")) {
        userWin = true;
      }
      if (arr.every((box) => boxs[box] === "cross")) {
        crossWin = true;
      }
    });

    if (userWin && !scoreUpdated) {
      let addScore = 1;
      let newScoreCombo = scoreCombo + 1;

      if (newScoreCombo === 3) {
        addScore += 1;
        setWinningMsg(
          "Circle Wins! Congratulations on winning 3 times and receiving 1 extra point!"
        );
        newScoreCombo = 0;
      } else {
        setWinningMsg("Circle Wins!");
      }

      setScore((prevScore) => prevScore + addScore);
      setScoreCombo(newScoreCombo);
      setScoreUpdated(true);
    } else if (crossWin) {
      let addScore = 1;
      if(score != 0) {
        setScore((prevScore) => prevScore - addScore);
      }
      setWinningMsg("Cross Wins!");
      setScoreCombo(0);
      setScoreUpdated(true);
    }

    if (!boxs.includes("") && !userWin && !crossWin) {
      setDrawMsg("Draw!");
      setScoreUpdated(true);
    }
  };

  const handlePlayerMove = (index) => {
    if (winningMsg || go !== "circle") return;

    const newBoxs = [...boxs];
    newBoxs[index] = "circle";
    setBoxs(newBoxs);
    setGo("cross");
  };

  const botMove = () => {
    if (winningMsg) return;

    setBoxs((prevBoxs) => {
      const availableBoxes = prevBoxs
        .map((ele, index) => (ele === "" ? index : null))
        .filter((val) => val !== null);

      if (availableBoxes.length > 0) {
        const randomIndex =
          availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        const newBoxs = [...prevBoxs];
        newBoxs[randomIndex] = "cross";
        setGo("circle");
        return newBoxs;
      }

      return prevBoxs;
    });
  };

  const handleClickRestart = () => {
    setBoxs(["", "", "", "", "", "", "", "", ""]);
    setWinningMsg(null);
    setDrawMsg(null);
    setGo("circle");
    setScoreUpdated(false);
  };

  const msg = (go === "cross" ? "X" : "O") + "'s turn";

  useEffect(() => {
    checkScore();
  }, [boxs]);

  useEffect(() => {
    if (go === "cross" && !scoreUpdated) {
      setTimeout(botMove, 300);
    }
  }, [go, scoreUpdated]);

  return (
    <div className="bot">
      <h1 className="mb-4">Tic Tac Toe Game</h1>
      <div className="gamebot">
        {boxs.map((box, index) => (
          <Box
            key={index}
            id={index}
            box={box}
            go={go}
            onPlayerMove={() => handlePlayerMove(index)}
            winningMsg={winningMsg}
          />
        ))}
      </div>

      <h4 style={{ marginTop: "10px" }}>{winningMsg || drawMsg || msg}</h4>
      <h4>Score Total {score}</h4>

      <button
        color="primary"
        className="btn-margin loginbtn"
        onClick={handleClickRestart}
      >
        Restart
      </button>
    </div>
  );
};

export default withAuthenticationRequired(BotComponent, {
  onRedirecting: () => <Loading />,
});
