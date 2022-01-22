let array = []

function setup() {
    createCanvas(windowWidth, windowHeight);
    createArray()
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
    spawnRecources()

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
    chosenCells = [
        emptyCells.splice(Math.floor(Math.random() * emptyCells.length), 1),
        emptyCells.splice(Math.floor(Math.random() * emptyCells.length), 1)
    ]
    console.log(emptyCells)
    console.log(chosenCells)
    array[emptyCells[0][0], emptyCells[0][1]] = 2

}