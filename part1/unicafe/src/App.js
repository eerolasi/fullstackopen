import { useState } from 'react'

const StatisticsLine = (props)=> {
  return(
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value} </td>
          </tr>
        </tbody>

  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
    <table>
    <StatisticsLine text="good" value={props.good}/>
    <StatisticsLine text="neutral" value={props.neutral}/>
    <StatisticsLine text="bad" value={props.bad}/>
    <StatisticsLine text="average" value={((props.good*1)+(props.bad*-1))/props.all}/>
    <StatisticsLine text="positive" value={(props.good/props.all)*100+"%"}/>
    </table>
    </>

  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad +1)
    setAll(all + 1)

  }

  return (
    <>
    <h1>give feedback</h1>
    <Button handleClick={handleGoodClick} text="good"/>
    <Button handleClick={handleNeutralClick} text="neutral" />
    <Button handleClick={handleBadClick} text="bad"/>
    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
  </>
  )

}

export default App