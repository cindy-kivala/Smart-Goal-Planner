
function NewGoalForm({ newGoal, setNewGoal, handleAddGoal }) {
  const handleChange = (e) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
    console.log(`${e.target.name}: ${e.target.value}`);
  };

  return (
    <form className="inputForm" onSubmit={handleAddGoal}>
      <input
        type="text"
        name="name"
        placeholder="Goal name"
        value={newGoal.name}
        onChange={handleChange}
      />
      <select
        name="category"
        value={newGoal.category}
        onChange={handleChange}
      >
        <option value="">Select category</option>
        <option value="Health">Health</option>
        <option value="Career">Career</option>
        <option value="Finance">Finance</option>
        <option value="Personal">Personal</option>
        <option value="Education">Education</option>
        <option value="Misc.">Misc.</option>
      </select>
      <input
        type="number"
        name="savedAmount"
        placeholder="Saved amount"
        value={newGoal.savedAmount}
        onChange={handleChange}
      />
      <input
        type="number"
        name="targetAmount"
        placeholder="Target amount"
        value={newGoal.targetAmount}
        onChange={handleChange}
      />
      <input
        type="date"
        name="deadline"
        value={newGoal.deadline}
        onChange={handleChange}
      />
      <button id="AddBtn" type="submit">Add Goal</button>
    </form>
  );
}

export default NewGoalForm;
