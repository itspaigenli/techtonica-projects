import { useEffect, useMemo, useState } from "react";
import QuestionCard from "./questioncard";

const Game = ({ settings }) => {
  const [questions, setQuestions] = useState([]);
  const [lives, setLives] = useState(3);
  const [answered, setAnswered] = useState({});

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

    // reset game whenever we load a new set of questions
    setLives(3);
    setAnswered({});

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
        if (err.name === "AbortError") return;
        console.error("Failed to load trivia questions:", err);
      });

    return () => controller.abort();
  }, [queryString]);

  const total = questions.length;
  const answeredCount = Object.keys(answered).length;

  const isGameOver = lives <= 0;
  const isFinished = total > 0 && answeredCount === total && lives > 0;

  const handleAnswer = (index, _choice, isCorrect) => {
    if (answered[index] !== undefined) return;

    setAnswered((prev) => ({ ...prev, [index]: true }));

    if (!isCorrect) {
      setLives((prev) => prev - 1);
    }
  };

  return (
    <div className="Container">
      <h2>Quiz</h2>

      <div className="scorebar">
        <span>Lives: {lives}</span>
        <span>
          Answered: {answeredCount} / {total}
        </span>
      </div>

      {isGameOver && <div className="result lose">Game Over</div>}
      {isFinished && <div className="result win">You Win!</div>}

      {!isGameOver &&
        questions.map((question, index) => (
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
