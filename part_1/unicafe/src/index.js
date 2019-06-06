import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// oikea paikka komponentin määrittelyyn

const Statistics = (props) => {
  // Ei heti tuu mitään fiksumpaa mieleen...
  if (props.summa === 0 && props.title === true) {
    return (
      <tr>
        <td>Ei yhtään palautetta annettu</td>
      </tr>
    )
  }

  if (props.summa === 0) {
    return (
      <tr>
        <td></td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.nimi} {props.sisalto}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>    
    {text}  
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>anna palautetta</h1>
        <Button handleClick={handleGoodClick} text='Hyvä' />
        <Button handleClick={handleNeutralClick} text='Neutraali' />
        <Button handleClick={handleBadClick} text='Huono' />
        <h1>statistiikka</h1>
        <table>
        <tbody>

        <Statistics title={true} summa={good+bad+neutral}/>
        <Statistics nimi="Hyvä" summa={good+bad+neutral} sisalto={good}/>
        <Statistics nimi="Neutraali" summa={good+bad+neutral} sisalto={neutral}/>
        <Statistics nimi="Huono" summa={good+bad+neutral} sisalto={bad}/>
        <Statistics nimi="Keskiarvo" summa={good+bad+neutral} sisalto={(good-bad)/(good+bad+neutral)}/>
        <Statistics nimi="Positiivisia" summa={good+bad+neutral} sisalto={(good)/(bad+good+neutral)*100}/>
        </tbody>
        </table>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)