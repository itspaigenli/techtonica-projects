import { useEffect, useState } from "react";

const GameSetupForm = ({ settings, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((r) => r.json())
      .then((data) => {
        setCategories(Array.isArray(data.trivia_categories) ? data.trivia_categories : []);
      })
      .catch(() => setCategories([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange({
      ...settings,
      [name]: name === "amount" ? Number(value) : value,
    });
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
          <option value="">Any Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={String(cat.id)}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default GameSetupForm;
