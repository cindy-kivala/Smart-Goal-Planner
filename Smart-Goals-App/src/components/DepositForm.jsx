import { useState } from 'react';

function DepositForm({ goal, onDeposit }) {
  const [amount, setAmount] = useState('');

  if (!goal) return <p>Select a goal to deposit into.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const deposit = parseFloat(amount);
    if (isNaN(deposit) || deposit <= 0) return;
    onDeposit(goal.id, deposit);
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h3>Deposit into {goal.name}</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="1"
        placeholder="Enter amount"
      />
      <button type="submit">💰 Deposit</button>
    </form>
  );
}

export default DepositForm;
// This component allows the user to deposit an amount into a selected goal.