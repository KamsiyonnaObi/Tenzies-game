import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import {nanoid} from "nanoid"

import './App.css'

import Die from './Die'
import Confetti from 'react-confetti'

export default function App() {
  const [diceValues, setDiceValues] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [highScore, setHighScore] = useState(() => JSON.parse(localStorage.getItem("highScore")) || 0)
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore))
},[highScore])

  useEffect(() => {
    const allHeld = diceValues.every(die => die.isHeld)
    const allSame = diceValues.every(
      (die) => die.value === diceValues[0].value
  )    
      setTenzies(allHeld && allSame)
    // console.log("Dice state Changed")
  }, [diceValues])
    

  function generateNewDie() {
    return { 
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice() {
    // const diceObj = {value: null, isHeld: false}
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(generateNewDie())
    }
    return dice;
  }

  const diceElements = diceValues.map(diceValue => (
    <Die key={diceValue.id} 
        value={diceValue.value}  
        isHeld={diceValue.isHeld} 
        holdDice={() => holdDice(diceValue.id)} />
  ))
  // const diceValue = allNewDice();
  // console.log(diceValues[0], "boy");
  const rollDice = () => {
    if (!tenzies){
      setCount((prevScore) => prevScore + 1)
      setDiceValues(oldDice => oldDice.map(die => {
        return die.isHeld ? 
              die :
              generateNewDie()
      }))  
    } else {
      setTenzies(false)
      setDiceValues(allNewDice())
      if (highScore === 0){
        setHighScore(count)
      } else if (count < highScore) {
        setHighScore(count)
      }
      setCount(0)
    }
  }

  const holdDice = (id) => {
    setDiceValues(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      
      <div className="button-container">
        <button className="roll-btn" onClick={rollDice}> 
          {tenzies ? "New Game":"Roll"} 
        </button>
        <div className="score-container">
          <p>Rolls: {count}</p>
          <p>Best: {highScore}</p>
        </div>
      </div>
    </main>
  )
}
