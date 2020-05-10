import React from 'react'
import Grid from './grid.js'

import {banner, submitSolution} from '../css/game.css'

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
        const selectedSquares = this.state.selectedSquares
        let occupiedSquares = this.state.ships.flatMap(ship => ship.coordinates)
        
        checkCoordinateArrayEquality(selectedSquares, occupiedSquares) ?  this.setState({ isComplete: true}) : this.setState({ selectedSquares: []})
    }

    resetBoardClickHandler() {
        this.resetGame()
    }
    
    unselectSquare(selectedSquare) {
        this.setState(
            { selectedSquares: this.state.selectedSquares.filter(obj => !checkCoordinateEquality(obj, selectedSquare)) }
            )
    }
    
    resetGame() {
        this.setState(
            {
                selectedSquares: [],
                ships: generateAllShipsForBoard(this.props.difficulty, this.props.gridSize, this.props.shipSize)
            }
        )
    }

    render(){
        return(
            <div>
                <h1 id={ banner }>Battleship</h1>
                <Grid 
                    shipPositions={this.state.ships}
                    selectedSquares={this.state.selectedSquares}
                    onClick={this.squareClickHandler}
                    isComplete={this.state.isComplete}
                />
                <button id={ submitSolution } onClick={this.submitSolutionClickHandler}>Submit your solution</button>
            </div>
        )
    }
}

export default Game