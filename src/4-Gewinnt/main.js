let array = []
let length = 7
let height = 6
let start = 50
let width = 100
let player = 1

function setup() {
    createCanvas(windowWidth, windowHeight);
    createArray()
    console.log(array)
}

function createArray() {
    for (let i = 0; i < height; i++) {
        temp = []
        for (let j = 0; j < length; j++) {
            temp.push(0)
        }
        array.push(temp)
    }
}

function displayGrid() {

    x = (windowWidth - (length * width)) / 2
    y = (windowHeight - (height * width)) / 2
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            if (array[i][j] == 0) fill(55, 55, 55)
            if (array[i][j] == 1) fill(255, 0, 0)
            if (array[i][j] == 2) fill(0, 0, 255)

            strokeWeight(20)
            square(j * width + x, i * width + y, width)
        }
    }
}

function mouseClicked() {
    x = (windowWidth - (length * width)) / 2
    y = (windowHeight - (height * width)) / 2
    pos = [mouseX, mouseY]
    row = Math.floor((mouseX - x) / width)

    for (let i = 0; i < height; i++) {
        if (array[height - i - 1][row] == 0) {
            array[height - i - 1][row] = player
            if (player == 1) {
                player = 2
            } else {
                player = 1
            }
            checkForWin(row, height - i - 1)
            break0
        }
    }
}

function checkForWin(x, y) {
    console.log(x, y)
    for (let i = 0; i < array.length; i++) {

    }
    if (condition) {

    }
}


function draw() {
    background(201);
    displayGrid()
    //noLoop()
}