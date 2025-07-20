import GoalItem from './GoalItem';

function GoalList({ goals, onDelete, onEdit, onDeposit }) {
  if (!goals || goals.length === 0) return <p>No goals to show.</p>;

  return (
    <ul className="goal-list">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onDelete={onDelete}
          onEdit={onEdit}
          onDeposit={onDeposit}
        />
      ))}
    </ul>
  );
}

export default GoalList;
