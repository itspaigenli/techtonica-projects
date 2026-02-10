import { useEffect, useState, useMemo } from "react";
import QuestionCard from "./questioncard";

const Game = ({ settings }) => {
  const [questions, setQuestions] = useState([]);

  // Build a stable query string from settings
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("amount", String(settings.amount || 10));

    if (settings.category) params.set("category", String(settings.category));
    if (settings.difficulty) params.set("difficulty", settings.difficulty);
    if (settings.type) params.set("type", settings.type);

    return params.toString();
  }, [settings.amount, settings.category, settings.difficulty, settings.type]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`http://localhost:3001/api/game?${queryString}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setQuestions(Array.isArray(data.results) ? data.results : []);
      })
      .catch((err) => {
        // ✅ Ignore the abort that happens during StrictMode remount/unmount
        if (err.name === "AbortError") return;

        console.error("Failed to load trivia questions:", err);
        // Optional: do NOT clear questions on error (prevents "vanish")
        // setQuestions([]);
      });

    // Cleanup: abort in-flight request on unmount/re-run
    return () => controller.abort();
  }, [queryString]);

  const handleAnswer = (index, answer) => {
    console.log(`Question ${index + 1} answered with: ${answer}`);
  };

  return (
    <div className="Container">
      <h2>Quiz</h2>
      {questions.map((question, index) => (
        <QuestionCard
          key={`${index}-${question.question}`}
          index={index}
          question={question}
          onAnswer={handleAnswer}
        />
      ))}
    </div>
  );
};

export default Game;
