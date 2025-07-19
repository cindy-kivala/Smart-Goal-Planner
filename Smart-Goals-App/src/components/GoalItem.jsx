function GoalItem({ goal, onDelete, onEdit }) {
  return (
    <li>
      <h2>{goal.name}</h2>
      <p>Category: {goal.category}</p>
      <p>Saved: ${goal.savedAmount}</p>
      <p>Target: ${goal.targetAmount}</p>
      <p>Deadline: {goal.deadline}</p>
      <button id="DeleteBtn" onClick={() => onDelete(goal.id)}>🗑️ Delete</button>
      <button id="EditBtn" onClick={() => onEdit(goal.id)}>✏️ Edit</button>
    </li>
  );
}

export default GoalItem;
