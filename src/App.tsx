import React, {useState} from 'react';
import './App.css';
import Board from './components/Board/Board';

const App: React.FC = () => {

    const [gameOver, setGameOver] = useState(false);
    const [resetCount, setResetCounter] = useState(0);

    const restartGame = () => {
        setGameOver(false);
        setResetCounter(prev => prev + 1);

    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Minesweeper</h1>
                <button className="option-button" onClick={restartGame}>Restart Game</button>
            </header>
            <main>
                <Board dimensions={10} numMines={11} resetCount={resetCount} />
            </main>
        </div>
    );
};

export default App;