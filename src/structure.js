import React, { useState,useEffect, Fragment } from 'react';
import swal from 'sweetalert';

import Square from './square'


class square  {
  isMine = false
  number_of_minesAround = 0
  id = 0
  isRevealed = false
}
let board = []

const Structure = ({rows,columns,mines}) => {

    let [generatedBoard, setGeneratedBoard] = useState([])
    //let [updated,setUpdated] = useState(1)
    let [resetGame, setresetGame] = useState(0)
    let [won, setWon] = useState(false)

    //call effect when update value changes
    // useEffect(() => {
        
    //     setGeneratedBoard(board)
    //     console.log('in second effect')

    // },[updated])

    useEffect( () => {
        setGeneratedBoard(ResetBoard)
        //console.log('in effect')
    },[]); // eslint-disable-line react-hooks/exhaustive-deps
 
   
////////////////////////////////////////////////////////////////////////////
    //1. Generate Board
    function createBoard()
    {
   
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
          
      
      //2.Generate Mines
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
    
      //3.generate numbers
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
    //////////////////////////////////////////////////////////////
      //4.Return the board
      function ResetBoard()
      {
          board.length = 0
          createBoard()
          return board;
      }
      //5.Reveal all squares
      function RevealAll()
      {
        for(let i = 0; i< rows ; i++)
        {
            for(let j = 0; j<columns ;j++)
            {
              board[i][j].isRevealed = true
            }
        }
        return board;
    }
    ///////////////////////////////////////////////////////////////////////
    //6.Open squares recursively
     function handleRecursiveOpen(id) {

      if(id < 0 || id >rows*columns-1) return;
       //console.log(id)
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
        return board;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleLoss = () => {
      
      setGeneratedBoard([...RevealAll()]);
      setresetGame(1)
      swal("Game Over!", "You stepped on a mine", "error");
    }

    const handleReset = () => {

      setGeneratedBoard([...ResetBoard()]);
      swal("Resetting your board");
      setTimeout(() => {
        swal("Done","Your Board is ready", "success");
        setWon(false);
        setresetGame(0)

      },500) 
     
    }
    //this works
    const zeroMines = (id) => {
       
        setGeneratedBoard([...handleRecursiveOpen(id)])
        // setUpdated(!updated);
       
    }
    //  This does not work
    // const zeroMines = (id) => {
       
    //     setGeneratedBoard( handleRecursiveOpen(id));
    //    
       
    // }

    // Why I included the update variable
     // const zeroMines = (id) => {
     //  
     //       handleRecursiveOpen(id);
     //        setUpdated(!updated);
     //    
    // }
    const countOpened = () => {
      let a = generatedBoard.map( x =>  {
        return(
            x.filter(y => y.isRevealed === true)
        )
    })
      let revealed = 0;
      a.map(x => {return(
          revealed = revealed + x.length
      )})
      
      if(revealed === ( rows*columns - mines))
         {
            setWon(true)
            swal("You Won!", "You found all mines!", "success");
         } 
          
    }
    return(
      <Fragment>
       
        <div className = 'container'>
            <h1 className = 'heading'> Minesweeper </h1>
            <div className = 'grid'>
              {generatedBoard.map((x,index) => {
                return( 
                  <div className = 'row' key = {index}>
                      {x.map( y => {
                        return(
                              <div key = {y.id.toString()} className = 'square' >
                                <Square square = {y}  click = {zeroMines} handleLoss = {handleLoss} countOpened = {countOpened} ></Square>
                              </div>
                            )
                        }
                      )}
                  </div>
                )})}
            </div>
            
               <div className = 'row buttonholder'>
               {
                resetGame || won ?  <button className = 'resetbtn' onClick= {handleReset} >Reset</button> : undefined
               }
              </div>
        </div>
      </Fragment>
    ) 
}

export default Structure