class square  {
    isBomb = false
    number_of_bombsaround = 0
}



let rows = 10
let columns = 14
let board = []

for(let i=0; i < rows; i++)
{
    board.push([]);

    board[i].push( new Array(columns));

    for(let j=0; j < columns; j++){
      board[i][j] = new square();
    }
}



for(let k = 0 ; k< 20 ;k++)
    {

        let a = Math.floor(Math.random() * (10)) 
        let b = Math.floor(Math.random() * (14));
        if(board[a][b].isBomb === true )
           {
            k--
           }
        else{
            board[a][b].isBomb = true
        }

    }
    console.log(board)
for(let i = 0; i< rows ; i++)
{
    for(let j = 0; j<columns ;j++)
    {
        if(board[i][j].isBomb === true)
            {
               if((i+1) <=( rows - 1))
               {
                   console.log(i,j)
                   board[i+1][j].number_of_bombsaround++;

               }
               if( (i-1) >=0 )
               {
                   console.log(i,j)
                   board[i-1][j].number_of_bombsaround++;

               }
                
                if( (j + 1) <= (columns-1))
                {
                    console.log(i,j)
                    board[i][j+1].number_of_bombsaround++;

                }
                if((j - 1) >= 0)
                {
                    console.log(i,j)
                    board[i][j-1].number_of_bombsaround++;

                }
                //////////////////////////////////////////////////////////////////////////////
                if((i-1) >= 0 && (j-1) >=0 )
                {
                    console.log(i,j)
                    board[i-1][j-1].number_of_bombsaround++;  

                }

                if((i-1) >=0 && (j+1) <=columns-1 )
                {
                    console.log(i,j)
                    board[i-1][j+1].number_of_bombsaround++; 
                }
                   
                
                if((i+1) <=(rows-1)  && (j-1) >=0 )
                {
                    console.log(i,j)
                    board[i+1][j-1].number_of_bombsaround++; 

                }
                
                if((i+1) <= (rows-1) && (j+ 1) <= (columns -1))
                {
                    console.log(i,j)
                    board[i+1][j+1].number_of_bombsaround++; 

                }
            }
        
    }

}
export default board