import { useRef } from "react";

const QuestionCard = ({ question, index, onAnswer }) => {
  const answerRef = useRef(null);

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Build answer options (incorrect + correct)
  const options = [
    ...(question.incorrect_answers || []),
    question.correct_answer,
  ]
    .filter(Boolean)
    .map(decodeHTML);

  // Shuffle options so correct answer isn't always in the same spot
  const shuffled = [...options].sort(() => Math.random() - 0.5);

  const handleSelection = (selected) => {
    answerRef.current = selected;
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
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
