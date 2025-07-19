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
  const [searchTerm, setSearchTerm] = useState('');


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
    fetch(`http://localhost:3000/goals/${editGoalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
     },
    body: JSON.stringify(formattedGoal),
  })
  .then((res) => res.json())
  .then((updatedGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === editGoalId ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    setIsEditing(false);
    setEditGoalId(null);
  })
  .catch((error) => console.error('Error editing goal:', error));

        setIsEditing(false);
        setEditGoalId(null);
  } else {
       const newGoalWithId = {
      ...formattedGoal
    };
    
    //Sdd posts
  fetch('http://localhost:3000/goals', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(newGoalWithId),
})
     .then((res) => res.json())
     .then((createdGoal) => {
      setGoals([...goals, createdGoal])
    })
     .catch((error) => console.error('Error adding goal:', error));

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
  const handleDeleteGoal = (id) => {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: 'DELETE',
   })
     .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to delete goal');
      }
      // Update state only if deletion is successful
      const updatedGoals = goals.filter(goal => goal.id !== id);
      setGoals(updatedGoals);
    })
    .catch((error) => {
      console.error('Error deleting goal:', error);
    });
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
    (selectedCategory === 'All' ||  goal.category === selectedCategory) &&
    goal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  //Display dATA-RENDER

    return (
    <div className={isDarkMode ? 'App dark-mode' : 'App light-mode'}>
      <button onClick={toggleTheme} className="theme-toggle">
        {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
     </button>

      <h1>Smart Goals Planner 🚀</h1>

     {/*SEARCH BAR*/}
      <input
        type="text"
        placeholder="Search goals..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

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
