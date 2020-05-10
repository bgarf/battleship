import React from 'react'

import { square, edge, explosion } from '../css/game.css'

const explosionStyle = {
    colour: "red"
}

class Square extends React.Component {
   
    generateTextContent() {
        const total = this.props.rowTotal
        if (total) {
            return total
        } else if (this.props.selected && !this.props.isComplete) {
            return 'X'
        }
    }
    
    render() {
        const classGroups = `${square} ${this.props.edge ? edge : ''} ${this.props.isComplete && this.props.selected ? explosion : ''}`
        
        return (
            <div 
                className={ classGroups }
                onClick={this.props.onClick}
            >
                {this.generateTextContent()}
            </div> 
        )
    }
}

export default Square