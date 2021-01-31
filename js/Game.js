/**
 * Example class
**/
export class Game {

    checkWinner(gameBoard){
        let winner = null
        
        for(let i = 0; i < 3; i++){
            if(Game.equals(gameBoard[i][0], gameBoard[i][1], gameBoard[i][2])){
                winner = gameBoard[i][0]
            }
        }
        
        for(let i = 0; i < 3; i++){
            if(Game.equals(gameBoard[0][i], gameBoard[1][i], gameBoard[2][i])){
                winner = gameBoard[0][i]
            }
        }
        if(Game.equals(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])){
            winner = gameBoard[0][0]
        }
        
        if(Game.equals(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])){
            winner = gameBoard[0][2]
        }
        let openSpots = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] == null) {
                    openSpots++;
                }
            }
        }
        
        if (winner === null && openSpots === 0) {
            
            return "T";
        }
        return winner
    }
    
    
    
    
    static equals(a, b, c){
        //console.log(a, b, c)
        return a === b && b === c && a === c
    }
}
