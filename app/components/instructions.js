import React from 'react'

import {instructionBanner} from '../css/game.css'

class Instructions extends React.Component {
    render() {
        return (
            <div id={ instructionBanner } >
                <h3>Instructions</h3>
                <p>
                    Try to hit all the battleship in the grid by selecting the square you believe are occupied by ships.
                </p>           
                <p>
                    The numbers along the x and y axis state the amount of squares occupied in that row/column. 
                </p>         
                <p>
                    Submit your solutions until you get it right. 
                </p>      
                <p>
                    GOOD LUCK!!
                </p>
            </div>
        )
    }
}

export default Instructions