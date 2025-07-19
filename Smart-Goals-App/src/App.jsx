import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/goals')
      .then(response => response.json())
      .then(data => setGoals(data))
      .catch(error => console.error('Error fetching goals:', error)) // Fetch goals from the JSON server
  }, [])
  
  //Display dATA
  return (
    <div className="App">
      <h1>Smart Goals Planner</h1>
      <ul>
        {goals.map(goal => (
          <li key={goal.id}>
            <h2>{goal.name}</h2>
            <p>Category: {goal.category}</p>
            <p>Saved: ${goal.savedAmount} / ${goal.targetAmount} </p>
            <p>Deadline: {goal.deadline}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
