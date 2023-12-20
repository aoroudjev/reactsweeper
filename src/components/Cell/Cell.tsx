import React from 'react';
import './Cell.css';

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
    const renderContent = (): string | null | number => {
        if (!isRevealed) {
            return isFlagged ? '🚩' : null;
        }
        if (isMine) {
            return '💣';
        }
        return adjacentMines > 0 ? adjacentMines : null;
    };

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
