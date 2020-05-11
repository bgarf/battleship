import React from 'react'
import Square from './square.js'

const {checkCoordinateEquality} =  require('../gameGenerator.js')

import { gridBorder } from '../css/game.css'

const range = [0,1,2,3,4,5]

class Grid extends React.Component {

    generateSquares(occupiedCoordinates) {
        let gridSquares = []
        
        for (let y = 0; y <= 6; y++) {
            for (let x = 0; x <= 6; x++) {
                let total = this.calculateSeperatedTotal(occupiedCoordinates, x, y)
                let isSelected = this.isSquareSelected({x: x, y: y})

                gridSquares.push(
                    <Square 
                        key={`${x}_${y}`}
                        rowTotal={x == 6 && y == 6 ? null : total}
                        edge={x == 6 || y == 6 ? true : false}
                        onClick={() => this.props.onClick({x: x, y: y})}
                        selected={isSelected}
                        isComplete={this.props.isComplete}
                    />
                )
            }
        }
            
        return gridSquares
    }

    calculateSeperatedTotal(occupiedCoordinates, x, y) {
        if (x == 6) {
            return this.calculateAxisTotal(occupiedCoordinates, 'y', 'x', y)
        } else if (y == 6) {
            return this.calculateAxisTotal(occupiedCoordinates, 'x', 'y', x)
        } 
    }
    
    calculateAxisTotal(occupiedCoordinates, axis, iterator, axisValue) { 
        let seperatedTotal = []
        let countGroup = 0
        const occupiedSquaresOnAxis = occupiedCoordinates.filter(obj => obj[axis] == axisValue)
        for (let num in range) {
            if (occupiedSquaresOnAxis.filter(obj => obj[iterator] == num).length !== 0) {
                countGroup++
            } else {
                if (countGroup > 0) seperatedTotal.push(countGroup)
                countGroup=0
            }
        }
        if (countGroup > 0 || seperatedTotal.length === 0) seperatedTotal.push(countGroup)
        return seperatedTotal.join(', ')
    }
    
    isSquareSelected(square) {
        return this.props.selectedSquares.filter(obj => checkCoordinateEquality(obj, square)).length > 0 ? true : false
    }

    render() {
        const squares = this.generateSquares(this.props.shipPositions.flatMap(ship => ship.coordinates))
        return (
            <div id={ gridBorder } >
                {squares}
            </div>
            
        )
    }
}

export default Grid