import { useState } from 'react';

function GoalItem({ goal, onDelete, onEdit, onDeposit }) {
  const [deposit, setDeposit] = useState('');

  const { id, name, category, savedAmount, targetAmount, deadline } = goal;

  // Calculate progress percentage (cap at 100%)
  const progressPercent = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100).toFixed(0);

  // Calculate amount remaining
  const remainingAmount = targetAmount - savedAmount;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(deposit);
    if (!isNaN(amount) && amount > 0) {
      onDeposit(id, amount);
      setDeposit('');
    }
  };


  return (
      <li className="goal-item">
        <h2>{goal.name}</h2>
        <p>Category: {category}</p>
        <p>Deadline: {deadline}</p>

       {/*Savings info */}
        <p>Saved: ${savedAmount} / {targetAmount}</p>
        <p>Remaining: ${remainingAmount}</p>

        {/* Progress Bar */}
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
           ></div>
         </div>

       {/* Deposit Form */}
        <form onSubmit={handleSubmit}>    
        <input
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          placeholder="Add deposit"
          min="1"
        />
        <button id="DepositBtn" type="submit">💰 Deposit</button>
        </form>

        {/* Action Buttons */}
        <button id="DeleteBtn" onClick={() => onDelete(goal.id)}>🗑️ Delete</button>
        <button id="EditBtn" onClick={() => onEdit(goal.id)}>✏️ Edit</button>
     </li>
    
  );
}

export default GoalItem;
