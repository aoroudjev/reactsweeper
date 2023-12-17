import React, {useState} from 'react';
import './App.css';
import Board from './components/Board/Board';

const App: React.FC = () => {

    const [resetCount, setResetCounter] = useState(0);

    const restartGame = (): void => {
        setResetCounter(prev => prev + 1);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Reactsweeper</h1>
                <button className="option-button" onClick={restartGame}>Restart Game</button>
            </header>
            <main>
                <Board dimensions={4} numMines={1} resetCount={resetCount} />
            </main>
        </div>
    );
};

export default App;