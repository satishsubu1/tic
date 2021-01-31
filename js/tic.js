
import { GameBoard } from "./GameBoard.js"
import { Player } from "./Players.js"

export const board = document.getElementById("game-board")

const FRAME_RATE = 10



board.addEventListener("click", pass)

function pass(event){
    game.convertAndAdd(event.clientX, event.clientY)
}

window.addEventListener("keypress", optimalMove)

function optimalMove(e){
    if(e.which === 32){
        game.human()
    }
}






let game = new GameBoard(board)
game.init()

let player1 = new Player("X")
player1.isBot = false
game.addPlayer(player1)

let player2 = new Player("O")
game.addPlayer(player2)



/*
let intervalId = setInterval(() => {
    
    let result = game.resultCheck()
    if(result !== null){
       
        clearInterval(intervalId)
    }
}, 1000 / FRAME_RATE)
*/


