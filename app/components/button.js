import React from 'react'

import {submitSolution} from '../css/game.css'

class Button extends React.Component {

    chooseButtonText() {
        return !this.props.isComplete ? 'Submit your solution' : 'Congratulation!  Play Again...'
    }
    
    render() {
        const text = this.chooseButtonText()
        return (
            <button id={ submitSolution } onClick={this.props.onClick}>{text}</button>
        )
    }
}

export default Button