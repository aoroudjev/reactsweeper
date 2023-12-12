import React, { useState } from "react";
import Cell from '../Cell/Cell';

type CellType = {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
};

type BoardState = CellType[][];

const Board: React.FC = () => {
    // Define the initial state for the board
    const [board, setBoard] = useState<BoardState>(generateInitialBoard());

    // Function to generate the initial board state
    function generateInitialBoard(): BoardState {
        // Placeholder function to generate an empty board
        // In a real implementation, you would randomize mine placement here
        const initialBoard: BoardState = Array(10).fill(null).map(() => Array(10).fill({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
        }));

        return initialBoard;
    }

    function handleCellClick(row: number, col: number): void {

    }

    // Function to handle cell right-click (flag cell)
    function handleCellRightClick(row: number, col: number): void {
        // Logic to flag the cell and update the board state
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
                                e.preventDefault(); // Prevent the context menu from appearing
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