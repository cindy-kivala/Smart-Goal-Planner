import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/goals')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched goals:', data)//confirm goal in console
        setGoals(data)
      })
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

      <h2>Add Your New Goal!</h2>
      <form onSubmit={handleAddGoal}>
        <input
          type="text"
          placeholder="Name"
          value={newGoal.name}
          onChange={(event) => setNewGoal({...newGoal, name: event.target.value})}
        />
           <input
          type="text"
          placeholder="Category"
          value={newGoal.category}
          onChange={(event) => setNewGoal({...newGoal, category: event.target.value})}
        />
           <input
          type="number"
          placeholder="Saved Amount"
          value={newGoal.savedAmount}
          onChange={(event) => setNewGoal({...newGoal, savedAmount: event.target.value})}
        />
           <input
          type="number"
          placeholder="Target Amount"
          value={newGoal.targetAmount}
          onChange={(event) => setNewGoal({...newGoal, targetAmount: event.target.value})}
        />
           <input
          type="date"
          value={newGoal.deadline}
          onChange={(event) => setNewGoal({...newGoal, deadline: event.target.value})}
        />
        <button type="submit">
          Add Your Goal
        </button>
      </form>
    </div>
  )
}

export default App
