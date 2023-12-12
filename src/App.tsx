import React from 'react';
import './App.css';
import Board from './components/Board/Board';

const App: React.FC = () => {
    // If you have any app-wide state, like a game over state or a restart function, it would go here.
    // For example:
    // const [gameOver, setGameOver] = useState(false);
    //
    // const restartGame = () => {
    //   // Logic to reset the game
    //   setGameOver(false);
    //   // Additional reset logic...
    // };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Minesweeper</h1>
                {/* Display any game-wide controls or status here, for example a restart button */}
                {/* gameOver && <button onClick={restartGame}>Restart Game</button> */}
            </header>
            <main>
                <Board />
            </main>
        </div>
    );
};

export default App;