let array = []
const arraySize = 50
let arrayWidth
let cellSize

function setup() {
    createCanvas(windowWidth, windowHeight);
    arrayWidth = Math.floor(arraySize * (windowWidth / windowHeight))
    cellSize = (windowHeight) / arraySize
    createArray()

    pausebutton = createButton('pause');
    pausebutton.position(0, 0);
    pausebutton.mousePressed(pause);

    clearbutton = createButton('clear');
    clearbutton.position(0, 20);
    clearbutton.mousePressed(clearBoard);

    refreshbutton = createButton('refresh');
    refreshbutton.position(0, 40);
    refreshbutton.mousePressed(createArray);
}


function createArray(){
    array = []
    for (let j = 0; j < arrayWidth; j++) {
        let temp = []
        for (let i = 0; i < arraySize; i++) {
           Math.round(Math.random())
           if (Math.round(Math.random()) == 1) {
               temp.push(true)
           } else {
               temp.push(false)
           }
        }
        array.push(temp)
    }
}

function draw() {
   background(201);
   frameRate(10)
   drawGrid()
   array = iterate()
   console.log("next round")
}

function drawGrid(){
    baseX = 0
    baseY = 0
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === true) {
                fill(50,50,50)
            } else {
                fill(255,255,255)
            }
            square(baseX +cellSize*i, baseY +cellSize*j,cellSize)
        }  
    }
}

function iterate(){
    let newArray = []
    for (let i = 0; i < array.length; i++) {
        let temp = []
        for (let j = 0; j < array[i].length; j++) {
            let neighbours = countNeighbours(i,j)
            if (array[i][j] == true) {
                if (neighbours < 2) {
                   temp.push(false)
                }
                if (neighbours >= 2 && neighbours < 4) {
                   temp.push(true)
                }
                if (neighbours > 3) {
                   temp.push(false)
                }
            } else {
                if (neighbours === 3) {
                    temp.push(true)
                }else{
                    temp.push(false)
                }
            }
        }
        newArray.push(temp)
    }
    return newArray
}

function countNeighbours(x,y){
    let count = 0
    posistions = [[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]]
    for (let i = 0; i < posistions.length; i++) {

        if (x + posistions[i][0] >= 0 &&
            y + posistions[i][1] >= 0 &&
            x + posistions[i][0] < arrayWidth &&
            y + posistions[i][1] < arraySize &&
            array[x + posistions[i][0]][y + posistions[i][1]] === true)
            {
            count ++
        }
    }
    return count
}

function pause(){
  if (isLooping()){
      noLoop()
  } else {
      loop()
  }
}

function clearBoard(){
    for (let j = 0; j < arraySize; j++) {
        for (let i = 0; i < arrayWidth; i++) {
            array[i][j] = false
        }
    }
}

function mouseClicked(event) {
    if(isLooping() == false){
      let x = Math.floor(event.clientX / cellSize)
      let y = Math.floor(event.clientY / cellSize)

      if (array[x][y] == true){
        array[x][y] = false
      } else {
        array[x][y] = true
      }
      drawGrid()
      console.log(array[x][y])
    }
  }