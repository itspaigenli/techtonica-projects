import { useRef, useState } from "react";

const QuestionCard = ({ question, index, onAnswer }) => {
  const answerRef = useRef(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const correctAnswer = decodeHTML(question.correct_answer);

  const options = [
    ...(question.incorrect_answers || []),
    question.correct_answer,
  ].map(decodeHTML);

  const shuffled = [...options].sort(() => Math.random() - 0.5);

  const handleSelection = (selected) => {
    answerRef.current = selected;
    const result = selected === correctAnswer;
    setIsCorrect(result);
    onAnswer(index, selected);
  };

  return (
    <div className="question-section">
      <p>
        <strong>Q{index + 1}:</strong> {decodeHTML(question.question)}
      </p>

      <div className="answer-section">
        {shuffled.map((choice) => (
          <button
            key={`${index}-${choice}`}
            type="button"
            onClick={() => handleSelection(choice)}
            disabled={isCorrect !== null}
          >
            {choice}
          </button>
        ))}
      </div>

      {isCorrect !== null && (
        <p>
          {isCorrect ? "✅ Correct!" : `❌ Incorrect. Correct answer: ${correctAnswer}`}
        </p>
      )}
    </div>
  );
};

export default QuestionCard;
