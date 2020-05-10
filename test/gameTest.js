const gameGenerator = require('../app/gameGenerator.js')
const expect = require('chai').expect;

describe('gameGenerator', function() {
    describe('#checkCoordinateArrayEquality', function() {
      it('should return false if the selected squares are less than the amount of squares occupied by ships', function() {
        const selectedSquares = []
        const ships = [{x: 1, y: 2}]
        
        const result = gameGenerator.checkCoordinateArrayEquality(selectedSquares, ships)
        
        expect(result).to.equal(false)
      })
      
      it('should return false if the selected squares are more than the amount of squares occupied by ships', function() {
        const selectedSquares = [{x: 1, y: 2}, {x: 2, y: 2}]
        const ships = [{x: 1, y: 2}]  
        
        const result = gameGenerator.checkCoordinateArrayEquality(selectedSquares, ships)
        
        expect(result).to.equal(false)
      })
      
      it('should return true if the selected squares match the squares occupied by ships', function() {
        const selectedSquares = [{x: 1, y: 2}, {x: 2, y: 2}]
        const ships =  [{x: 1, y: 2},  {x: 2, y: 2}]
        
        const result = gameGenerator.checkCoordinateArrayEquality(selectedSquares, ships)
        
        expect(result).to.equal(true)
      })
      
      it("should return false if the selected squares don't match the squares occupied by ships", function() {
        const selectedSquares = [{x: 1, y: 2},  {x: 2, y: 2} ,  {x: 3, y: 5}]
        const ships =  [{x: 1, y: 2},  {x: 2, y: 2} ,  {x: 5, y: 4}]
        
        const result = gameGenerator.checkCoordinateArrayEquality(selectedSquares, ships)
        
        expect(result).to.equal(false)
      })
    })
})