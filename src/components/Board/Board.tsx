import React, {useEffect, useState} from "react";
import Cell from '../Cell/Cell';
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

type CellType = {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
};

type BoardState = CellType[][];

const Board: React.FC<{resetCount: number }> = ({resetCount}) => {

    const [board, setBoard] = useState<BoardState>(generateInitialBoard(6));

    function generateInitialBoard(numMines: number): BoardState {

        const initialBoard: BoardState = Array(10).fill(null).map(() => Array(10).fill({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
        }));

        // TODO: populate board

        return initialBoard;

    }


    function handleCellClick(row: number, col: number): void {
        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((currentRow) =>
                currentRow.map((cell) => ({...cell}))
            );

            if (!newBoard[row][col].isRevealed) {
                newBoard[row][col].isRevealed = true;
            }

            return newBoard;
        })
    }

    function handleCellRightClick(row: number, col: number): void {
        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((currentRow) =>
                currentRow.map((cell) => ({...cell}))
            );

            newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;

            return newBoard;
        })
    }

    useEffect(() => {
        if (resetCount){
            setBoard(generateInitialBoard(6));
        }
    }, [resetCount]);


    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            isMine={cell.isMine}
                            isRevealed={cell.isRevealed}
                            isFlagged={cell.isFlagged}
                            adjacentMines={cell.adjacentMines}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                handleCellRightClick(rowIndex, colIndex);
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;