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

    const [board, setBoard] = useState<BoardState>([[]]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameWon, setGameWon] = useState<boolean>(false)
    const [revealedCells, setRevealedCells] = useState<number>(0);
    const [firstClick, setFirstClick] = useState<boolean>(true);

    useEffect(() => {
        setBoard(generateInitialBoard);
        setGameOver(false);
        setGameWon(false);
        setRevealedCells(0);
        setFirstClick(true);
    }, [dimensions, numMines, resetCount]);

    function generateInitialBoard(): BoardState {

        return Array(dimensions).fill(null).map(() =>
            Array(dimensions).fill(null).map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                adjacentMines: 0
            }))
        );
    }

    function populateAdjacent(rand_row: number, rand_col: number): void {
        // check all neighbors logic
        for (let row = Math.max(rand_row - 1, 0); row <= Math.min(rand_row + 1, dimensions - 1); row++) {
            for (let col = Math.max(rand_col - 1, 0); col <= Math.min(rand_col + 1, dimensions - 1); col++) {
                if (row !== rand_row || col !== rand_col) {
                    board[row][col].adjacentMines += 1;
                }
            }
        }
    }

    function revealAllCells(boardState: BoardState): void {
        boardState.forEach(row => {
            row.forEach(cell => {
                cell.isRevealed = true;
            });
        });
    }

    function placeMines(clickedRow: number, clickedCol: number): void {
        let minesPlaced = 0;
        if (numMines >= dimensions * dimensions) {
            return
        }
        while (minesPlaced < numMines) {
            const randRow = Math.floor(Math.random() * dimensions);
            const randCol = Math.floor(Math.random() * dimensions);
            if (!(board[randRow][randCol].isMine)) {
                if (!(randRow == clickedRow && randCol == clickedCol)) {
                    board[randRow][randCol].isMine = true;
                    populateAdjacent(randRow, randCol);
                    minesPlaced++;
                }
            }
        }
    }

    function handleCellClick(row: number, col: number): void {
        if (gameWon) {
            return
        }

        if (firstClick) {
            placeMines(row, col);
            setFirstClick(false);
        }

        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((currentRow) =>
                currentRow.map((cell) => ({...cell}))
            );

            function recursive_reveal(row: number, col: number, increment: () => void): void {
                newBoard[row][col].isRevealed = true;
                increment();

                // number caught
                if (newBoard[row][col].adjacentMines !== 0) {
                    return;
                }

                // check all neighbors logic
                for (let curr_row = Math.max(row - 1, 0); curr_row <= Math.min(row + 1, dimensions - 1); curr_row++) {
                    for (let curr_col = Math.max(col - 1, 0); curr_col <= Math.min(col + 1, dimensions - 1); curr_col++) {
                        if (curr_row === row && curr_col === col) {
                            continue;
                        }
                        if (newBoard[curr_row][curr_col].isRevealed) {
                            continue;
                        }
                        recursive_reveal(curr_row, curr_col, increment);
                    }
                }
                return
            }

            if (newBoard[row][col].isMine) {
                setGameOver(true);
                revealAllCells(newBoard);
            } else if (!newBoard[row][col].isRevealed) {
                let count = 0;
                const increment = (): number => {
                    return count += 1;
                }

                recursive_reveal(row, col, increment);
                const newCount = revealedCells + count;
                setRevealedCells(newCount);
                if (newCount >= ((dimensions * dimensions) - numMines)) {
                    setGameWon(true);
                }
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
            {gameOver && <div className="game-end-message">Game Over!</div>}
            {gameWon && <div className="game-end-message">Winner Winner Chicken Dinner</div>}
        </div>
    );
};

export default Board;