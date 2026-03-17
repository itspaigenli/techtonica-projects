import { useState } from "react";
import { createItem } from "../api";

function Form({ onSuccess }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!text.trim()) return;

    try {
      await createItem({ name: text });
      setText("");

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError("Could not submit form.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter value"
      />
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Form;
