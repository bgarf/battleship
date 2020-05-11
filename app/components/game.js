import React from 'react'
import Grid from './grid.js'
import Button from './button.js'
import Instructions from './instructions.js'

import {banner, container, centralColumn} from '../css/game.css'

const {checkCoordinateEquality, generateAllShipsForBoard, checkCoordinateArrayEquality} =  require('../gameGenerator.js')


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedSquares: [],
            ships: generateAllShipsForBoard(this.props.difficulty, this.props.gridSize, this.props.shipSize),
            isComplete: false
        }
        this.squareClickHandler = this.squareClickHandler.bind(this)
        this.submitSolutionClickHandler = this.submitSolutionClickHandler.bind(this)
        this.unselectSquare = this.unselectSquare.bind(this)
    }

    squareClickHandler(selectedSquare) {
        const selectedSquares = this.state.selectedSquares
        
        const selected = selectedSquares.filter((obj) =>
          checkCoordinateEquality(obj, selectedSquare)
        )
        
        if (selected.length == 0) { 
            this.setState(
                { selectedSquares: selectedSquares.concat([selectedSquare]) }
            )
        } else { this.unselectSquare(selectedSquare) }
    }

    submitSolutionClickHandler() {
        if (this.state.isComplete) {
            this.resetGame()
        } else {
            const selectedSquares = this.state.selectedSquares
            let occupiedSquares = this.state.ships.flatMap(ship => ship.coordinates)
            
            checkCoordinateArrayEquality(selectedSquares, occupiedSquares) ?  this.setState({isComplete: true}) : this.setState({ selectedSquares: []})
        }
    }
    
    resetGame() {
        this.setState(
            {
                selectedSquares: [],
                ships: generateAllShipsForBoard(this.props.difficulty, this.props.gridSize, this.props.shipSize),
                isComplete: false
            }
        )
    }

    unselectSquare(selectedSquare) {
        this.setState(
            { selectedSquares: this.state.selectedSquares.filter(obj => !checkCoordinateEquality(obj, selectedSquare)) }
            )
    }

    chooseButtonText() {
        return 
    }
    

    render(){
        return(
            <div>
                <div id={container}>
                    <Instructions />
                    <div id={centralColumn}>
                        <h1 id={ banner }>Battleship</h1>
                        <Grid 
                            shipPositions={this.state.ships}
                            selectedSquares={this.state.selectedSquares}
                            onClick={this.squareClickHandler}
                            isComplete={this.state.isComplete}
                        />
                        <Button 
                            onClick={this.submitSolutionClickHandler} 
                            isComplete={this.state.isComplete}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Game