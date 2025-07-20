function GoalOverview({ goals }) {
  if (!goals || goals.length === 0) return <p>No goals yet.</p>;

  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const completed = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  return (
    <section className="goal-overview">
      <h2>📊 Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Saved: ${totalSaved} / ${totalTarget}</p>
      <p>Completed Goals: {completed}</p>
    </section>
  );
}

export default GoalOverview;
// This component displays an overview of the user's goals, including total goals, total saved amount, target amount, and completed goals.