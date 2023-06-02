const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const resetButton = document.querySelector("#reset-button");
const startCells = [
    " ", " ", " ",  " ", " ", " ",  " ", " ", " "
]

let turn = "circle"
let squareEventListeners = []; // Store event listeners for each square
infoDisplay.textContent = "Circle goes first!"

function createBoard() {
    startCells.forEach((_cell, index)=>{
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addTurn)
        gameBoard.append(cellElement)
        squareEventListeners.push(addTurn); // Store the event listener
    })

}

createBoard()

function addTurn(e){
    const turnDisplay=document.createElement('div')
    turnDisplay.classList.add(turn)
    e.target.append(turnDisplay)
    turn = turn === "circle" ? "cross" : "circle"
    infoDisplay.textContent="It is now " + turn + "'s turn."
    e.target.removeEventListener("click", addTurn)
    checkScore()
}

function checkScore(){
    const allSquares = document.querySelectorAll('.square')
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    let isTie = true; // Assume it's a tie initially

    /*winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle'))
        
        if(circleWins){
           infoDisplay.textContent = "Circle Wins!"
           allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
           return
        }
    })

    
    if (isTie) {
        const isBoardFull = [...allSquares].every(square => square.firstChild);
        if (isBoardFull) {
            infoDisplay.textContent = "It's a Tie!";
        }
    }

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('cross'))
        
        if(crossWins){
           infoDisplay.textContent = "Cross Wins!"
           allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
           return
        }
    })*/

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));
        
        if (circleWins || crossWins) {
            infoDisplay.textContent = circleWins ? "Circle Wins!" : "Cross Wins!";
            isTie = false;
            allSquares.forEach(square => square.removeEventListener('click', addTurn));
            return;
        }
    });
    
    if (isTie) {
        const isBoardFull = [...allSquares].every(square => square.firstChild);
        if (isBoardFull) {
            infoDisplay.textContent = "It's a Tie!";
        }
    }
    
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach((square, index) => {
        square.innerHTML = '';
        square.removeEventListener('click', squareEventListeners[index]); // Remove the stored event listener
        square.addEventListener('click', addTurn); // Add click event listener back
    });
    infoDisplay.textContent = "Circle goes first!";
    turn = "circle";
    squareEventListeners = []; // Clear the stored event listeners
}