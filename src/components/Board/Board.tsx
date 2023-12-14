import React, {useEffect, useState} from "react";
import Cell from '../Cell/Cell';

type CellType = {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
};

type BoardState = CellType[][];

type BoardProps = {
    numMines: number;
    resetCount: number;
    dimensions: number;
}

const Board: React.FC<BoardProps> = ({numMines, resetCount, dimensions}) => {

    const [board, setBoard] = useState<BoardState>(() => generateInitialBoard(numMines));

    useEffect(() => {
        setBoard(generateInitialBoard(numMines));
    }, [dimensions, numMines, resetCount]);

    function generateInitialBoard(numMines: number): BoardState {

        const initialBoard: BoardState = Array(dimensions).fill(null).map(() =>
            Array(dimensions).fill(null).map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                adjacentMines: 0
            }))
        );


        for (let i = 0; i < numMines; i++) {
            let rand_row = Math.floor(Math.random() * dimensions);
            let rand_col = Math.floor(Math.random() * dimensions);
            if (initialBoard[rand_row][rand_col].isMine) {
                i--;
            } else {
                initialBoard[rand_row][rand_col].isMine = true;
                populate_adjacent(rand_row, rand_col);
            }
        }

        function populate_adjacent(rand_row: number, rand_col: number) {
            // check all neighbors logic
            for (let row = Math.max(rand_row - 1, 0); row <= Math.min(rand_row + 1, dimensions - 1); row++) {
                for (let col = Math.max(rand_col - 1, 0); col <= Math.min(rand_col + 1, dimensions - 1); col++) {
                    if (row !== rand_row || col !== rand_col) {
                        initialBoard[row][col].adjacentMines += 1;
                    }
                }
            }
        }


        return initialBoard;

    }


    function handleCellClick(row: number, col: number): void {
        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((currentRow) =>
                currentRow.map((cell) => ({...cell}))
            );

            function recursive_reveal(row: number, col: number) {
                if (newBoard[row][col].isRevealed) {
                    return
                }
                newBoard[row][col].isRevealed = true;

                if (newBoard[row][col].adjacentMines !== 0) {
                    return
                }

                // check all neighbors logic
                for (let curr_row = Math.max(row - 1, 0); curr_row <= Math.min(row + 1, dimensions - 1); curr_row++) {
                    for (let curr_col = Math.max(col - 1, 0); curr_col <= Math.min(col + 1, dimensions - 1); curr_col++) {
                        if (curr_row === row && curr_col === col) {
                            continue;
                        }
                        recursive_reveal(curr_row, curr_col);
                    }
                }
            }

            if (!newBoard[row][col].isRevealed) {
                recursive_reveal(row, col)
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