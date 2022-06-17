import styles from '../styles/Game.module.css'
import React, {useState, useEffect, createContext} from "react";
import {NextPage} from "next";



const Square = (props : {value : number, onClick: any}) => {
  return (
    <button className={styles.square} onClick={props.onClick}>
        {props.value}
      </button>
  );
};

const Board = () => {
  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onClick={onClick(squares,i)} />;
  }
  const status = 'Next player: X';
  const [squares, setSquares] = useState(Array(9).fill(null));
  const onClick = (squares: Array<string>,i: number) => {
      squares[i] = 'X';
      setSquares([...squares])
  }
  return (
      <div>
        <div className={styles.status}>{status}</div>
        <div className={styles.boardRow}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className={styles.boardRow}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className={styles.boardRow}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    )
}

const Game : NextPage = () => {
    return (
      <div className={styles.game}>
        <div className="game-board">
          <Board />
        </div>
        <div className={styles.gameInfo}>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
}

export default Game;
