import React, {useState} from 'react';
import './App.css';
import Board from './components/Board/Board';

const App: React.FC = () => {

    const [resetCount, setResetCounter] = useState(0);
    const [boardSize, setBoardSize] = useState(10);
    const [mineCount, setMineCount] = useState(10);

    const restartGame = (): void => {
        setResetCounter(prev => prev + 1);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Reactsweeper</h1>
                <p className="italic">
                    where we believe in never losing on your first click
                </p>
            </header>
            <div className="utils">
                <div className="board-options">
                    <h3>Board Size</h3>
                    <div>
                        <button className="option-button" onClick={() => setBoardSize(5)}>5 X 5</button>
                        <button className="option-button" onClick={() => setBoardSize(8)}>8 X 8</button>
                    </div>
                    <div>
                        <button className="option-button" onClick={() => setBoardSize(15)}>15 X 15</button>
                        <button className="option-button" onClick={() => setBoardSize(20)}>20 X 20</button>
                    </div>
                </div>
                <div className="board-options">
                    <h3>Restart</h3>
                    <button className="option-button" onClick={restartGame}>Restart Game</button>
                </div>
                <div className="board-options">
                    <h3>Mine Count</h3>
                    <div>
                        <button className="option-button" onClick={() => setMineCount(5)}>5</button>
                        <button className="option-button" onClick={() => setMineCount(10)}>10</button>
                    </div>
                    <div>
                        <button className="option-button" onClick={() => setMineCount(15)}>15</button>
                        <button className="option-button" onClick={() => setMineCount(30)}>30</button>
                    </div>

                </div>
            </div>
            <main>
                <Board dimensions={boardSize} numMines={mineCount} resetCount={resetCount} />
            </main>
        </div>
    );
};

export default App;