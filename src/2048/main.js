let array = [
    [0, 0, 0, 0],
    [0, 0, 0, 4],
    [0, 0, 0, 0],
    [0, 0, 0, 2]
]

function setup() {
    createCanvas(windowWidth, windowHeight);
    createArray()
    spawnRecources()
    let row1 = [8, 8, 2, 8]
    checkRow(row1)
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
    console.log(array)
}


function draw() {
    background(201);
    drawGrid()
    frameRate(1)
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

            fill(255, 255, 255)
            square(x, y, cellSize)

            fill(0, 0, 0)
            textSize(36);
            textStyle(BOLD);
            text(array[i][j], x - (distance / 2) + (cellSize / 2), y + cellSize / 2 + 10);
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

    for (let i = 0; i < 2; i++) {
        chosenCell = emptyCells.splice(Math.floor(Math.random() * emptyCells.length), 1)
        if (Math.random() < 0.5) {
            array[chosenCell[0][0]][chosenCell[0][1]] = 2
        } else {
            array[chosenCell[0][0]][chosenCell[0][1]] = 4
        }
    }
}


function moveRecources(row) {
    newRow = [row[0]]
    for (let j = 1; j < 2; j++) {
        if (row[j] == newRow[j - 1]) {
            newRow[j - 1] = newRow[j - 1] * 2
            newRow.push(0)
        } else if (row[j - 1] == 0 || row[j] == 0) {
            newRow.push(0)
        } else if (row[j - 1] != 0 || row[j - 1] != row[j]) {
            newRow.push(row[j])
        }
    }
    console.log(newRow)
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
    console.log(newCells)
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
        newArray = []
        for (let i = 0; i < 4; i++) {
            newRow = [array[i][0]]

        }
    } else if (keyCode === RIGHT_ARROW) {
        console.log("right")
    } else if (keyCode === UP_ARROW) {
        console.log("up")
    } else if (keyCode === DOWN_ARROW) {
        console.log("down")
    }
}