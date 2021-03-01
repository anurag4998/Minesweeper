class square  {
    isMine = false
    number_of_minesAround = 0
    id = 0
    isRevealed = false
}


let rows = 8
let columns = 8
let board = []
let openedsquares = []
let mines = 10

function createBoard(){
   
    let _id = 0
    for(let i=0; i < rows; i++)
    {
        board.push([]);

        board[i].push( new Array(columns));

        for(let j=0; j < columns; j++){
        board[i][j] = new square();
        board[i][j].id = _id++
        }
    }
    for(let i=0; i < rows*columns; i++)
    {
        openedsquares[i] = false;
    }

    //Generate Mines
    for(let k = 0 ; k< mines ;k++)
    {

        let a = Math.floor(Math.random() * (rows)) 
        let b = Math.floor(Math.random() * (columns));
        if(board[a][b].isMine === true )
           {
            k--
           }
        else{
            board[a][b].isMine = true
        }

    }

    //generate numbers
    for(let i = 0; i< rows ; i++)
    {
        for(let j = 0; j<columns ;j++)
        {
            if(board[i][j].isMine === true)
                {
                if((i+1) <=( rows - 1))
                {
                    board[i+1][j].number_of_minesAround++;

                }
                if( (i-1) >=0 )
                {
                    board[i-1][j].number_of_minesAround++;

                }
                    
                    if( (j + 1) <= (columns-1))
                    {
                        board[i][j+1].number_of_minesAround++;

                    }
                    if((j - 1) >= 0)
                    {
                        board[i][j-1].number_of_minesAround++;

                    }
                    //////////////////////////////////////////////////////////////////////////////
                    if((i-1) >= 0 && (j-1) >=0 )
                    {
                        board[i-1][j-1].number_of_minesAround++;  

                    }

                    if((i-1) >=0 && (j+1) <=columns-1 )
                    {
                        board[i-1][j+1].number_of_minesAround++; 
                    }
                    
                    
                    if((i+1) <=(rows-1)  && (j-1) >=0 )
                    {
                        board[i+1][j-1].number_of_minesAround++; 

                    }
                    
                    if((i+1) <= (rows-1) && (j+ 1) <= (columns -1))
                    {
                        board[i+1][j+1].number_of_minesAround++; 

                    }
                }
        }

    }
}




export function handleRecursiveOpen(id) {

    if(id < 0 || id >rows*columns-1) return;
    // console.log(id)
    openedsquares[id] = true;
    let i = Math.floor( (id)/columns) ;
    let j = (id) % columns;
    if(board[i][j].isMine === false ) 
        board[i][j].isRevealed = true;
    // console.log(i,j)
        if((i+1) <=( rows - 1))
            {
                if(board[i+1][j].isMine === false && board[i+1][j].isRevealed !== true)
                    {
                        if(board[i][j].number_of_minesAround === 0)
                            handleRecursiveOpen(id+columns)
                    }
            }

            if((i-1) >=0)
            {
                if(board[i-1][j].isMine === false && board[i-1][j].isRevealed !== true)
                    {
                        //console.log('left')
                        if(board[i][j].number_of_minesAround === 0)
                            handleRecursiveOpen(id-columns)
                    }
            }

            if( (j + 1) <= (columns-1))
            {
               if( board[i][j+1].isMine === false && board[i][j+1].isRevealed !== true)
                {
                    //console.log('bottom')
                    if(board[i][j].number_of_minesAround === 0)
                        handleRecursiveOpen(id+1)

                }
            }
            if((j - 1) >= 0)
            {
                if( board[i][j-1].isMine === false && board[i][j-1].isRevealed !== true)
                {
                    //console.log('top')
                    if(board[i][j].number_of_minesAround === 0)
                            handleRecursiveOpen(id-1)

                }
            }


    return openedsquares
}

export function OpenedArray()
{
    return openedsquares;
}

export function ResetBoard()
{
    board.length = 0
    openedsquares.length = 0
    createBoard()
    return board;
}

export function CheckWin()
{
    let a = board.map( x =>  {
        return(
            x.filter(y => y.isRevealed === true)
        )
    })
    console.log(a)
    let revealed = 0;
    a.map(x => {return(
        revealed = revealed + x.length
    )})

    if(revealed === ( rows*columns - mines))
        return true;
    
    return false
}