function Filter({ selectedCategory, onCategoryChange }) {
  return (
    <div>
      <label>Filter by category: </label>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Health">Health</option>
        <option value="Career">Career</option>
        <option value="Finance">Finance</option>
      </select>
    </div>
  );
}

export default Filter;
