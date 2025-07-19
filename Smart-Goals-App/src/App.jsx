import { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter'
import NewGoalForm from './components/NewGoalForm'
import GoalItem from './components/GoalItem'

function App() {
  //theme and toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  //goals,filter,editing
  const [goals, setGoals] = useState([])
  const [newGoal, setNewGoal] = useState({
    name: '',
    category: '',
    savedAmount: '',
    targetAmount: '',
    deadline: ''
  })
  const [isEditing, setIsEditing] = useState(false);
  const [editGoalId, setEditGoalId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All')

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
  const handleAddGoal =  async (event) => {
    event.preventDefault();

    const formattedGoal = {
      ...newGoal,
      savedAmount: parseFloat(newGoal.savedAmount),
      targetAmount: parseFloat(newGoal.targetAmount),
    };

    if (isEditing) {
    // Edit mode: update existing goal
      const updatedGoals = goals.map((goal) =>
         goal.id === editGoalId ? { ...newGoal, id: editGoalId } : goal
    );
        setGoals(updatedGoals);
        setIsEditing(false);
        setEditGoalId(null);
  } else {
       const newGoalWithId = {
      ...newGoal,
      savedAmount: parseFloat(newGoal.savedAmount),
      targetAmount: parseFloat(newGoal.targetAmount),
      id: Date.now(),
    };
    setGoals([...goals, newGoalWithId]);
  }

  //clear our form after add/edit
    setNewGoal({ 
      name: '', 
      category: '', 
      savedAmount: '', 
      targetAmount: '', 
      deadline: '' 
    });
  };

    console.log('Adding your new goal:', newGoal)


  //delete function
  const handleDeleteGoal = id => {
    setGoals(goals.filter(goal => goal.id !== id))
  }
  
  //Edit function
   const handleEditClick = id => {
    const goalToEdit = goals.find((goal) => goal.id === id);
    if (goalToEdit) {
      setNewGoal(goalToEdit);//pre fills our form with the selected goal
      setIsEditing(true); //we are now in edit mode
      setEditGoalId(id); //store goals id for later saving
      console.log("Editing goal:", goalToEdit)
    }
   }
  
  const handleCategoryChange = category => {
    setSelectedCategory(category)
  }

  const filteredGoals = goals.filter(goal =>
    selectedCategory === 'All' ? true : goal.category === selectedCategory
  )


  //Display dATA-RENDER

    return (
    <div className={isDarkMode ? 'App dark-mode' : 'App light-mode'}>
      <button onClick={toggleTheme} className="theme-toggle">
        {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
     </button>

      <h1>Smart Goals Planner 🚀</h1>
      <NewGoalForm 
         newGoal={newGoal} 
         setNewGoal={setNewGoal} 
         handleAddGoal={handleAddGoal}
       />
      <Filter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ol>
        {filteredGoals.map(goal => (
          <GoalItem
            key={goal.id}
            goal={goal}
            onDelete={handleDeleteGoal}
            onEdit={handleEditClick}
          />
        ))}
      </ol>
    </div>
  )
}

export default App
