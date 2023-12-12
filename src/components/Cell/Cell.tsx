import React from 'react';
import './Cell.css'; // Assuming you have CSS for styling the cell

type CellProps = {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
    onClick: () => void;
    onContextMenu: (e: React.MouseEvent) => void;
};

const Cell: React.FC<CellProps> = ({
                                       isMine,
                                       isRevealed,
                                       isFlagged,
                                       adjacentMines,
                                       onClick,
                                       onContextMenu,
                                   }) => {
    const renderContent = () => {
        if (!isRevealed) {
            return isFlagged ? '🚩' : null;
        }
        if (isMine) {
            return '💣';
        }
        return adjacentMines > 0 ? adjacentMines : null;
    };

    // Add additional classes based on the cell state for styling
    let className = 'cell';
    if (isRevealed) className += ' is-revealed';
    if (isMine && isRevealed) className += ' is-mine';
    if (isFlagged) className += ' is-flagged';

    return (
        <button
            className={className}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            {renderContent()}
        </button>
    );
};

export default Cell;
