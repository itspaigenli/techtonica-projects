import { useRef } from "react";

const QuestionCard = ({ question, index, onAnswer }) => {
    // useRef to control the selected input value
    const answerRef = useRef(null);

    const handleSelection = (selected) => {
        answerRef.current = selected; // Updates the ref without re-rendering
        onAnswer(index, selected);    // Calls the callback function
    };

    const decodeHTML = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    return (
      <div className="question-section">
        <p><strong>Q{index + 1}:</strong> {decodeHTML(question.question)}</p>
        <div className='answer-section'>
            <button onClick={() => handleSelection("True")}>True</button>
            <button onClick={() => handleSelection("False")}>False</button>
        </div>
      </div>
    );
};

export default QuestionCard;