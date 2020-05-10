import React from 'react';
import ReactDOM from 'react-dom';

import Game from './components/game.js';

import './css/index.css';

class App extends React.Component {
    render() {
        return(
            <Game 
                difficulty={2}
                shipSize={[1, 2, 4]}
                gridSize={6}
            />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))