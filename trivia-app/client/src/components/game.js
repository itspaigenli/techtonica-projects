import { useState, useEffect } from "react";
import QuestionCard from "./questioncard";

const Game = (props) => {
const [questions, setQuestions] = useState([]);

    const loadData = () => {
        fetch('http://localhost:3000/api/game')
            .then((response) => response.json())
            .then(data => {
                setQuestions(data.results);
            })
    }

    useEffect(() => {
        loadData();
    }, [])

    // Callback function to handle input from child components
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
}

export default Game;
