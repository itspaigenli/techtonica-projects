import { useRef, useState } from "react";

const QuestionCard = ({ question, index, onAnswer }) => {
  const answerRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const correct = decodeHTML(question.correct_answer);

  const options = [
    ...(question.incorrect_answers || []),
    question.correct_answer,
  ]
    .filter(Boolean)
    .map(decodeHTML);

  const shuffled = [...options].sort(() => Math.random() - 0.5);

  const handleSelection = (choice) => {
    answerRef.current = choice;
    setSelected(choice);
    onAnswer(index, choice);
  };

  const answered = selected !== null;
  const gotItRight = answered && selected === correct;

  return (
    <div className="question-card">
      <div className="question-header">
        <p className="question-text">
          <strong>Q{index + 1}:</strong> {decodeHTML(question.question)}
        </p>

        {answered && (
          <span className={`badge ${gotItRight ? "badge--good" : "badge--bad"}`}>
            {gotItRight ? "Correct" : "Incorrect"}
          </span>
        )}
      </div>

      <div className="answer-grid">
        {shuffled.map((choice) => {
          const isSelected = choice === selected;
          const isCorrectChoice = choice === correct;

          let className = "answer-btn";
          if (answered && isCorrectChoice) className += " answer-btn--correct";
          if (answered && isSelected && !isCorrectChoice) className += " answer-btn--wrong";
          if (answered && isSelected) className += " answer-btn--selected";

          return (
            <button
              key={`${index}-${choice}`}
              type="button"
              className={className}
              onClick={() => handleSelection(choice)}
              disabled={answered}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {answered && !gotItRight && (
        <p className="correct-line">Correct answer: <strong>{correct}</strong></p>
      )}
    </div>
  );
};

export default QuestionCard;
