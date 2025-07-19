import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [goals, setGoals] = useState([])
  
  const [newGoal, setNewGoal] = useState({
    name: '',
    category: '',
    savedAmount: '',
    targetAmount: '',
    deadline: ''
  })

  useEffect(() => {
    fetch('http://localhost:3000/goals')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched goals:', data)//confirm goal in console
        setGoals(data)
      })
      .catch(error => console.error('Error fetching goals:', error)) // Fetch goals from the JSON server
  }, [])
  
  //Handle form submission
  function handleAddGoal(event) {
    event.preventDefault()

    const goalToAdd = {
      ...newGoal,//spread operator
      savedAmount: parseFloat(newGoal.savedAmount),
      targetAmount: parseFloat(newGoal.targetAmount)
    }

    console.log('Adding your new goal:', goalToAdd)

    //FETCH FUNCTION
    fetch('http://localhost:3000/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalToAdd)//distinguish
    })
    //unwrap prom
      .then(res => res.json())
      .then(data => {
        console.log('Server response:', data)
        setGoals([...goals, data])//spread add-on data
        setNewGoal({
          name: '',
          category: '',
          savedAmount: '',
          targetAmount: '',
          deadline: ''
        })
      })
      //catch error
      .catch(err => console.error('Ooops! Error adding your goal:', err))
    
  }
  //Handle typing: chnaged to specifically handle in form chnages
  function handleNewGoalChange(field, value) {
    console.log(`${field} typing:`, value) //log typing input
    setNewGoal({ ...newGoal, [field]: value })
  }

  //delete function
  function handleDeleteGoal(id) {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: 'DELETE'
    })
      .then(() => { 
        console.log(`Goal deleted successfully!:`, id)
        setGoals(goals.filter(goal => goal.id !== id)) //filter out deleted goal
      })
      .catch(err => console.error('Error deleting goal:', err))
  }


  //Display dATA-RENDER
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
            <button onClick={() => handleDeleteGoal(goal.id)}>
              Delete Goal
            </button>
          </li>
        ))}
      </ul>

      <h2>Add Your New Goal!</h2>
      <form onSubmit={handleAddGoal}>
        <input
          type="text"
          placeholder="Name"
          value={newGoal.name}
          onChange={(event) => handleNewGoalChange('name', event.target.value)}
        />
           <select
             value={newGoal.category}
             onChange={(event) => handleNewGoalChange('category', event.target.value)}
           >
             <option value="">-- Choose Category --</option>
             <option value="Health">Health</option>
             <option value="Finance">Finance</option>
             <option value="Career">Career</option>
             <option value="Education">Education</option>
             <option value="Electronics">Electronics</option>
             <option value="Personal">Personal</option>  
           </select>

           <input
          type="number"
          placeholder="Saved Amount"
          value={newGoal.savedAmount}
          onChange={(event) => handleNewGoalChange('savedAmount', event.target.value)}
        />
           <input
          type="number"
          placeholder="Target Amount"
          value={newGoal.targetAmount}
          onChange={(event) => handleNewGoalChange('targetAmount', event.target.value)}
        />
           <input
          type="date"
          value={newGoal.deadline}
          onChange={(event) => handleNewGoalChange('deadline', event.target.value)}
        />
        <button type="submit">
          Add Your Goal
        </button>
      </form>
    </div>
  )
}

export default App
