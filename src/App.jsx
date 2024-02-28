// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import Board from './components/Board';

function App() {

 useEffect(() => {
  document.title = 'Wordle Game'
 } , [])
 return (
  <>
  <Board />
  </>
 )
   
}

export default App
