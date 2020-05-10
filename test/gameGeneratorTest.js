const battleship = require('../app/gameGenerator.js')
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('battleship', function() {
  describe('#generateRandomCoordinates()', function() {
    it('should return a random coordinate within grid size', function() {
        const [x, y] = battleship.generateRandomCoordinate(6)
        expect(x).to.be.within(0, 5)
        expect(y).to.be.within(0, 5)
    });
  });
  describe('#generateRandomCoordinates()', function() {
    it('should return a random coordinate within grid size', function() {
        const number = battleship.generateRandomNumber(10)
        expect(number).to.be.within(0, 9)
    });
  });

  describe('#findShipPosition()', function() {
    it('should return a set of n coordinates moving along the x axis, when passed n and a starting coordinate', function() {
        const [x, y] = [1, 2]
        const n = 3
        const expectedCoordinates = [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}]
        assert.deepEqual(battleship.findShipPosition(y, x, n, true), expectedCoordinates)
    });

    it('should return a set of n coordinates moving along the x axis, adjusted to fit in the grid', function() {
        const [x, y] = [6, 5]
        const n = 3
        const expectedCoordinates = [{x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}]
        assert.deepEqual(battleship.findShipPosition(y, x, n, true), expectedCoordinates)
    });

    it('should return a set of n coordinates moving along the y axis, when passed n and a starting coordinate', function() {
        const [x, y] = [1, 2]
        const n = 3
        const expectedCoordinates = [{x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}]
        assert.deepEqual(battleship.findShipPosition(x, y, n, false), expectedCoordinates)
    });
    
    it('should return a set of n coordinates moving along the x axis, adjusted to fit in the grid', function() {
        const [x, y] = [6, 6]
        const n = 3
        const expectedCoordinates = [{x: 6, y: 4}, {x: 6, y: 5}, {x: 6, y: 6}]
        assert.deepEqual(battleship.findShipPosition(x, y, n, false), expectedCoordinates)
    });
  });
});