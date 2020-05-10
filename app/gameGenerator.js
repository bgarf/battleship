
function printShipsToConsole(ships, gridSize) {
    console.log("================================================")
    console.log("                                                ")
    for (let y = 0; y < gridSize; y++) {
        let occupied = "          "
        for (let x = 0; x < gridSize; x++) {
            let allShipCoordinates = getAllOccupiedCoordinates(ships)
            doesShipCollideWithExistingShip({x: x, y: y}, allShipCoordinates) ? occupied = occupied.concat("[x]") : occupied = occupied.concat("[ ]")
        }
        console.log(occupied)
    }
    console.log("                                                ")
    console.log("================================================")
}


function Ship(coords, size) {
    this.coordinates = coords
    this.size = size
}

function generateAllShipsForBoard(difficulty, gridSize, shipSizes) {
    let placeHorizontally = true
    let occupiedCoordinates
    let ships = []

    for (let i = 0; i < difficulty; i++) {
        shipSizes.forEach(size => {
            let ship
            do {
                ship = generateShip(size, placeHorizontally, gridSize)
                placeHorizontally ? placeHorizontally = false : placeHorizontally = true
                occupiedCoordinates = getAllOccupiedCoordinates(ships)
            } while (ship.coordinates.filter(set => doesShipCollideWithExistingShip(set, occupiedCoordinates)).length != 0)
            ships.push(ship)
        })
    }
    printShipsToConsole(ships, gridSize)
    return ships
}

function generateShip(shipSize, placeHorizontally, gridSize) {
    const coordinates = generateRandomCoordinate(gridSize)
    return new Ship(
        findShipPosition(coordinates[0], coordinates[1], shipSize, placeHorizontally),
        shipSize
        )
}

function doesShipCollideWithExistingShip(coordinates, occupied) {
    const conflicts = occupied.filter(obj => {
        return obj.x == coordinates.x && obj.y == coordinates.y
    })
    return conflicts.length != 0 ? true : false
}

// Work out how to update node to swap this to flatmap
function getAllOccupiedCoordinates(ships) {
    return ships.map(ship => ship.coordinates).reduce((x,y)=> x.concat(y), [])
}

function findShipPosition(staticAxis, iterator, shipSize, axis) {
    let shipCoordinates = []    
    const positiveDistance = iterator + shipSize - 1
    const negativeDistance = iterator - shipSize + 1
    if (positiveDistance < 6) {
        addShipCoordinates(shipCoordinates, iterator, positiveDistance, staticAxis, axis)
    } else {
        addShipCoordinates(shipCoordinates, negativeDistance, iterator, staticAxis, axis)
    } 
    return shipCoordinates
}

function addShipCoordinates(coordinateArray, start, end, staticAxis, axis) {
    for (let i = start; i <= end; i++) {
        axis ? coordinateArray.push({x: i, y: staticAxis}) : coordinateArray.push({x: staticAxis, y: i}) 
    }
}

function generateRandomNumber(limit) {
    return Math.floor(Math.random() * limit)
}

function generateRandomCoordinate(gridSize) {
    return [generateRandomNumber(gridSize), generateRandomNumber(gridSize)]
}

function checkCoordinateEquality(first, second) {
    return first.x == second.x && first.y == second.y
}

function checkCoordinateArrayEquality(arrayOne, arrayTwo) {
    let comparisonArray = arrayTwo
    if (arrayOne.length != arrayTwo.length) return false
    
    for (let objectOne of arrayOne) {
        comparisonArray = comparisonArray.filter((objectTwo) => !checkCoordinateEquality(objectTwo, objectOne))
    }
    
    return comparisonArray.length === 0 ? true : false
}

module.exports = {
    checkCoordinateEquality,
    generateAllShipsForBoard,
    generateRandomCoordinate,
    generateRandomNumber,
    findShipPosition,
    checkCoordinateArrayEquality
}