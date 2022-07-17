import './App.css';
import * as React from 'react';
import { useState } from 'react';

import ReactDOM from 'react-dom';


function App() {
  const [x_oState, setXOState] = useState(
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  )

  const [gameCondition, setGameCondition] = useState(null)
  const [nextChar, setNextChar] = useState('x')

  const getWinChar = () => {
    // row
    for (let i = 0; i < 3; i++) {
      let row = x_oState[i]
      if (row[0] === row[1] && row[1] === row[2] && row[0]) {
        return row[0]
      }
    }

    for (let i = 0; i < 3; i++) {
      if (x_oState[0][i] === x_oState[1][i] && x_oState[1][i] === x_oState[2][i] && x_oState[0][i]) {
        return x_oState[0][i]
      }
    }
    if (x_oState[0][0] === x_oState[1][1] && x_oState[1][1] === x_oState[2][2] && x_oState[0][0]) {
      return x_oState[0][0]
    }
    if (x_oState[2][0] === x_oState[1][1] && x_oState[1][1] === x_oState[0][2] && x_oState[2][0]) {
      return x_oState[2][0]
    }
    return null;
  }


  const checkWinCondition = () => {
    const niceChar = getWinChar()
    console.log(x_oState, niceChar)
    if (!niceChar) {
      return;
    }
    setGameCondition(niceChar)
  }
  const reset = () => {
    setXOState([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])

    setGameCondition(null)
    setNextChar('x')
  }

  const onButtonClick = (xCoord, yCoord) => {
    setXOState(prev => {
      if (!prev[xCoord][yCoord] && !gameCondition) {
        prev[xCoord][yCoord] = nextChar
        setNextChar(prev => {
          if (prev === 'x') {
            return 'o'
          } else {
            return 'x'
          }
        })
        return { ...prev }
      } else {
        return { ...prev }
      }
    })
  }

  React.useEffect(() => {
    checkWinCondition()
  }, [x_oState])


  return (
    < div className="App" >

      {gameCondition ? <p>{'The winner is ' + gameCondition}</p> : null}

      <table className="GameX-O">
        <tbody>
          <tr className="row">
            <button className="colum" onClick={() => onButtonClick(0, 0)}>{x_oState[0][0]}</button>
            <button className="colum" onClick={() => onButtonClick(0, 1)}>{x_oState[0][1]}</button>
            <button className="colum" onClick={() => onButtonClick(0, 2)}>{x_oState[0][2]}</button>
          </tr>
          <tr className="row">
            <button className="colum" onClick={() => onButtonClick(1, 0)}>{x_oState[1][0]}</button>
            <button className="colum" onClick={() => onButtonClick(1, 1)}>{x_oState[1][1]}</button>
            <button className="colum" onClick={() => onButtonClick(1, 2)}>{x_oState[1][2]}</button>
          </tr>
          <tr className="row">
            <button className="colum" onClick={() => onButtonClick(2, 0)}>{x_oState[2][0]}</button>
            <button className="colum" onClick={() => onButtonClick(2, 1)}>{x_oState[2][1]}</button>
            <button className="colum" onClick={() => onButtonClick(2, 2)}>{x_oState[2][2]}</button>
          </tr>
        </tbody>
      </table>

      <button onClick={() => reset()}>Reset</button>

    </div >
  );

}

export default App;
