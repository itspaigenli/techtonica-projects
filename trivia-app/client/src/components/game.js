import { useState, useEffect, useRef } from "react";
import QuestionCard from "./questioncard";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    fetch("http://localhost:3000/api/game")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setQuestions(Array.isArray(data.results) ? data.results : []);
      })
      .catch((err) => {
        console.error("Failed to load trivia data:", err);
        setQuestions([]);
      });
  }, []);

  const handleAnswer = (index, answer) => {
    console.log(`Question ${index} answered with: ${answer}`);
  };

  return (
    <div className="Container">
      <h2>Science & Nature Quiz</h2>
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          index={index}
          question={question}
          onAnswer={handleAnswer}
        />
      ))}
    </div>
  );
};

export default Game;
