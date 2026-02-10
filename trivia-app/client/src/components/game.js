import { useState, useEffect, useRef } from "react";
import QuestionCard from "./questioncard";

const Game = ({ settings }) => {
  const [questions, setQuestions] = useState([]);
  const didFetch = useRef(false);

  useEffect(() => {
    // Reset guard when settings change
    didFetch.current = false;
  }, [settings]);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    const params = new URLSearchParams();
    params.set("amount", settings.amount);
    params.set("category", settings.category);

    if (settings.difficulty) {
      params.set("difficulty", settings.difficulty);
    }

    if (settings.type) {
      params.set("type", settings.type);
    }

    fetch(`http://localhost:3001/api/game?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(Array.isArray(data.results) ? data.results : []);
      })
      .catch((error) => {
        console.error("Failed to load trivia questions:", error);
        setQuestions([]);
      });
  }, [settings]);

  const handleAnswer = (index, answer) => {
    console.log(`Question ${index + 1} answered with: ${answer}`);
  };

  return (
    <div className="Container">
      <h2>Science & Nature Quiz</h2>

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
