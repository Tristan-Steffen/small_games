let array = []

let colors = {
    0: [255, 255, 255],
    2: [238, 228, 218],
    4: [237, 224, 200],
    8: [242, 177, 121],
    16: [245, 149, 99],
    32: [246, 124, 96],
    64: [246, 94, 59],
    128: [237, 207, 115],
    256: [237, 204, 98],
    512: [237, 200, 80],
    1024: [237, 197, 63],
    2048: [237, 194, 45]
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    createArray()
    spawnRecources()

}

function createArray() {
    array = []
    for (let j = 0; j < 4; j++) {
        let temp = []
        for (let i = 0; i < 4; i++) {
            temp.push(0)
        }
        array.push(temp)
    }
}

function draw() {
    background(201);
    drawGrid()
    noLoop()
}

function drawGrid() {
    baseX = 50
    baseY = 50
    cellSize = 150
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let x = baseX + cellSize * i
            let y = baseY + cellSize * j
            distance = textWidth(array[i][j])

            value = array[j][i]

            fill(colors[value])
            square(x, y, cellSize)

            fill(0, 0, 0)
            textSize(36);
            textStyle(BOLD);
            
            if (value == 0) {
                value = ""
            }
            text(value, x - (distance / 2) + (cellSize / 2), y + cellSize / 2 + 10);
        }
    }
}

function spawnRecources() {
    emptyCells = []

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (array[i][j] == 0) {
                emptyCells.push([i, j])
            }
        }
    }

    for (let i = 0; i < Math.min(2, emptyCells.length); i++) {
        chosenCell = emptyCells.splice(Math.floor(Math.random() * emptyCells.length), 1)
        if (Math.random() < 0.5) {
            array[chosenCell[0][0]][chosenCell[0][1]] = 2
        } else {
            array[chosenCell[0][0]][chosenCell[0][1]] = 4
        }
    }
}

function rotateArray() {
    finallArray = []
    for (let i = 0; i < array.length; i++) {
        temp = []
        for (let j = 0; j < array[i].length; j++) {
            temp.push(array[array[i].length - j - 1][i])
        }
        finallArray.push(temp)
    }
    array = finallArray
}

function moveRecourcesLeft() {
    console.log(array)
    newArray = []
    for (let i = 0; i < array.length; i++) {
        newArray.push(checkRow(array[i]))
    }
    array = newArray
}

function checkTwoCells(a, b) {
    newCells = [a]
    if (a === b) {
        newCells[0] = b * 2
        newCells.push(0)
    } else if (b === 0 && a === 0) {
        newCells.push(0)
    } else if (a === 0) {
        newCells[0] = b
        newCells.push(0)
    } else {
        newCells.push(b)
    }
    return newCells
}

function checkRow(row) {
    newRow = checkTwoCells(row[0], row[1])
    for (let i = 2; i < row.length; i++) {
        for (let j = 0; j <= i - 1; j++) {
            temp = []
            if (j == 0) {
                temp = checkTwoCells(newRow[i - 1], row[i])
            } else {
                temp = checkTwoCells(newRow[i - 1 - j], newRow[i - j])
            }
            newRow[i - 1 - j] = temp[0]
            if (newRow.length <= i - j) {
                newRow.push(temp[1])
            } else {
                newRow[i - j] = temp[1]
            }
        }
    }
    return newRow
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        moveRecourcesLeft()
        spawnRecources()
        drawGrid()
    } else if (keyCode === RIGHT_ARROW) {
        rotateArray()
        rotateArray()
        moveRecourcesLeft()
        spawnRecources()
        rotateArray()
        rotateArray()
        drawGrid()
    } else if (keyCode === UP_ARROW) {
        rotateArray()
        rotateArray()
        rotateArray()
        moveRecourcesLeft()
        spawnRecources()
        rotateArray()
        drawGrid()
    } else if (keyCode === DOWN_ARROW) {
        rotateArray()
        moveRecourcesLeft()
        spawnRecources()
        rotateArray()
        rotateArray()
        rotateArray()
        drawGrid()
    }
}