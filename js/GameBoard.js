/**
 * Example class
**/
import { board } from "./tic.js"
import { Game } from "./Game.js"

export class GameBoard extends Game{
    constructor() {
        super()
        this._board = board
        this._ctx = this._board.getContext('2d')
        this._gameBoard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
        
        this._players = []
        this._currentPlayerIndex = 0
        
    }

    render(){
        let board = this._board
        let ctx = this._ctx
        
        
        let w = Math.floor(board.width / 3)
        let h = Math.floor(board.height / 3)
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                let x = w * i + w / 2
                let y = h * j + h / 2
                let text = (this._gameBoard[i][j] === null)? "" : this._gameBoard[i][j]._char
                ctx.font = "40px Arial";
                ctx.textAlign = "center";
                this._ctx.fillStyle = "#000"
                ctx.fillText(text, x, y)
            }
        }
        
        let result = this.resultCheck()
        if(result !== null){
            alert(result)
        }
    }
    
    resultCheck(){
        let result = super.checkWinner(this._gameBoard)
        if(result !== null){
             if(result === "T"){
                return "It's a tie!"
            }else{
                return `${result._char} won!`
            }
        }
        return null
    }
    
    init(){
        this._board.width = board.height = 400
        //this._ctx.fillStyle = "#333"
        //this._ctx.fillRect(0, 0, board.width, board.height)
        
        this.line(0, 133, 400, 133)
        this.line(0, 266, 400, 266)
        this.line(0, 266, 400, 266)
        this.line(133, 0, 133, 400)
        this.line(266, 0, 266, 400)
        
    }
    
    line(x, y, w, h){
        this._ctx.beginPath();
        this._ctx.moveTo(x, y);
        this._ctx.lineTo(w, h);
        this._ctx.stroke();
    }
    
    add(x, y){
        if(this._currentPlayer){
            if(this._gameBoard[x][y] === null){
                this._gameBoard[x][y] = this._currentPlayer
                this.switchPlayer()
            }
            
        }
        this.render()
    }
    
    convertAndAdd(x, y){
        let w = Math.floor(board.width / 3)
        let h = Math.floor(board.height / 3)
        
        let i = Math.floor(x / w)
        let j = Math.floor(y / h)
        this.add(i, j)
    }
    
    switchPlayer(){
        if(this._currentPlayerIndex === 0){
            this._currentPlayerIndex = 1
        }else{
            this._currentPlayerIndex = 0
        }
        this.currentPlayer(this._players[this._currentPlayerIndex])
        
        this.bot()
        
    }
    
    
    bot(){
        if(this._currentPlayer.isBot){
            let move = this._currentPlayer.botMove(this._gameBoard, this._currentPlayer, this._players[0])
            if(move){
                this.add(move.i, move.j)
            }
        }
    }
    human(){
        let move = this._currentPlayer.botMove(this._gameBoard, this._currentPlayer, this._players[1])
        if(move){
            this.add(move.i, move.j)
        }
    }
    addPlayer(player){
        this._players.push(player)
        this.currentPlayer(this._players[this._currentPlayerIndex])
    }
    
    currentPlayer(player){
        this._currentPlayer = player
    }
    
    getPlayers(){
        alert(JSON.stringify(this._players))
    }
    
    convertToIndex(x, y){
        
    }
    
}