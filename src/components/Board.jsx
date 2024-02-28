import React, { useState, useEffect } from "react";
import KeyBoard from "./KeyBoard";
import '../App.css';
import { wordsList } from "../constaints/wordsGame";

function Board() {
    
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomIndex];
  };




  const [board, setBoard] = useState(new Array(5).fill("").map(() => new Array(5).fill("")));
  const [currentCol, setCol] = useState(0);
  const [currentCell, setCell] = useState(0);
  const [word, setWord] = useState(getRandomWord());
  const [isWord  , setIsWord] = useState("");
  const [won , setWon] = useState(false)
  const [stop , setStop] = useState(false)
  


  useEffect(() => {
    const getKey = (e) => {
      let letter = e.key.toUpperCase();
      const isLetter = /^[a-zA-Z]$/;

      if (e.key === 'Backspace') {
        deleteLetterBefore();
      }
      if (isLetter.test(letter) && (!won && !stop)) {
        updateBoard(letter);
      }
    };

  
    document.addEventListener('keyup', getKey);

    return () => {
      document.removeEventListener('keyup', getKey);
    }
  }, [currentCell, currentCol]);


  useEffect(() => {

   for(let i = 0 ; i < board.length ; i++){
    const columnWord = board[i].join("").toUpperCase();
    console.log(board[i].join(""))
    if (columnWord === word.toUpperCase()) {
      window.alert("won");
      setWon(true)
      break;

    }

      
  }

   
  }, [board , word , isWord])
    

  if(won){
    window.alert("the game will be restarted")
    setInterval(() => {
     return window.location.reload();
    } , 2000)
   }
  function getBackgroundColor(index, letter) {
    const splitWord = word.toUpperCase().split('');
  if(letter !== "") {
     
    if (splitWord.includes(letter)) {
      if (splitWord[index] === letter ) {
        return  '#79b851';
      } else {
        return '#ffc425';
      }
    } else {
      return '#fffff';
    }
  }
  }

  function deleteLetterBefore() {
    let updateB = [...board];
    if (currentCell >= 0) {
      if (updateB[currentCol][currentCell - 1] !== "") {
        updateB[currentCol][currentCell - 1] = "";
        setCell(currentCell - 1);
      } else {
        return;
      }
    }
    if (currentCell - 1 < 0) {
      setCell(0);
    }
  }

  function updateBoard(currentLetter) {
    let updateB = [...board];
    setIsWord(isWord.concat(currentLetter));

    if (currentCell < 4) {
      setCell(currentCell + 1);
    } else {
      // Se ha llegado al final de la fila, pasa a la siguiente columna
      setCol(currentCol + 1);
      setCell(0);
      setIsWord(""); // Reinicia la palabra temporal
    }

    if (currentCol === 4 && currentCell === 4) {
      let playerWinner = false



        for(let i = 0 ; i < board.length ; i++){
          const columnWord = board[i].join("").toUpperCase();
          console.log(board[i].join(""))
          if (columnWord === word.toUpperCase()) {
           
            setTimeout(() => {
              window.alert("won");
              playerWinner = true
              setWon(true)
            } , 500)
            break;

          }

        }
      setTimeout(() => {
        if(!playerWinner) {
          window.alert("finished game");
          setStop(true)
          window.location.reload();
          return;
        }
      } , 1200)
       
     
    }

    updateB[currentCol][currentCell] = currentLetter;
    setBoard(updateB);
  }


   console.log(word)


  return (
    <>
      <div style={{ display: 'grid', fontWeight:'500' , margin: 'auto', marginTop: '70px', justifyContent: 'center', alignItems: 'center', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', width: '300px' }}>
        {board.length > 0 && board.map((col, i) => (
          <React.Fragment key={i}>
            {col.map((cell, j) => (
              <div
                key={j}
                style={{
                  display : 'flex',
                  flexDirection : 'column',
                  justifyContent : 'center',
                  alignItems : 'center' ,
                  height: '40px',
                  width: '40px',
                  textAlign: 'center',
                  border: '2px solid #dee1e9',
                  padding: '7px',
                  background: getBackgroundColor(j, cell),
                  fontWeight: '900',
                  gap: '15px',
                  borderRadius : '5px',
                  
                }}
              >
                <p style={{fontSize : '22px' , opacity : '0.6' , display: "flex" , justifyContent:"center" , alignItems:"center"}}>  {cell}</p>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      
      <div style={{display : 'flex'  ,  justifyContent : 'center' , alignItems : 'center', marginTop : '35px' ,  gap : '5px'}}>
      <KeyBoard getLetter={updateBoard} />

      </div>
      
    </>
  );
}

export default Board;
