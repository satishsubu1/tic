/**
 * Example class
**/

import {Game} from "./Game.js"

export class Player extends Game{
    constructor(char, val) {
        super()
        this._char = char
        this._isBot = true
        
        
        this._score = {
            X: -10,
            O: 10,
            T: 0
        }

    }
    
    botMove(gameboard, player, oppPlayer){
        //console.log(player, oppPlayer)
        return this.optimalMove(gameboard, player, oppPlayer)
        //return this.move(gameboard)
    }
    
    move(gameboard){
        let available = []
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(gameboard[i][j] === null){
                    available.push({i, j})
                }
            }
        }
        
        let move = Math.floor(Math.random() * available.length)
        return available[move]
    }
    
    
    optimalMove(gameboard, player, oppPlayer){
        let bestScore = -Infinity;
          let move;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              // Is the spot available?
              if (gameboard[i][j] === null) {
                gameboard[i][j] = player;
                let score = this.minimax(gameboard, player, oppPlayer, false, 0);
                gameboard[i][j] = null;
                if (score > bestScore) {
                  bestScore = score;
                  move = { i, j };
                }
              }
            }
          }
          
          return move
          //board[move.i][move.j] = ai;
          //currentPlayer = human;
    }
    
    
    minimax(board, player, oppPlayer, isMaximizing, depth){
        let result = super.checkWinner(board);
        if (result !== null) {
            if(result === "T"){
                return this._score["T"]
            }else{
                return this._score[result._char]
            }
        }
        
        if(isMaximizing){
        
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                // Is the spot available?
                    if (board[i][j] === null) {
                        board[i][j] = player;
                        let score = this.minimax(board, player, oppPlayer, false, depth + 1);
                        board[i][j] = null;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        }else{
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                // Is the spot available?
                    if (board[i][j] === null) {
                        board[i][j] = oppPlayer;
                        let score = this.minimax(board, player, oppPlayer, true, depth + 1);
                        board[i][j] = null;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
  
    }
    
    set isBot(bot){
        this._isBot = bot
    }
    get isBot(){
        return this._isBot
    }
    
}
