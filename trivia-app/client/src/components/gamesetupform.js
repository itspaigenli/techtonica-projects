const GameSetupForm = ({ settings, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...settings, [name]: value });
  };

  return (
    <form className="setup-form">
      <label>
        Number of Questions
        <input
          type="number"
          name="amount"
          min="1"
          max="50"
          value={settings.amount}
          onChange={handleChange}
        />
      </label>

      <label>
        Question Type
        <select name="type" value={settings.type} onChange={handleChange}>
          <option value="">Any</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </label>

      <label>
        Difficulty
        <select name="difficulty" value={settings.difficulty} onChange={handleChange}>
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <label>
        Category
        <select name="category" value={settings.category} onChange={handleChange}>
          <option value="17">Science & Nature</option>
          {/* can expand later */}
        </select>
      </label>
    </form>
  );
};

export default GameSetupForm;
