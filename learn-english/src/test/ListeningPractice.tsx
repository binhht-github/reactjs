import React, { useState, useRef } from "react";


const ListeningPractice: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const question = {
        audioSrc: "your-audio-file.mp3",
        text: "What is the main topic of the audio?",
        options: [
            { id: "a", text: "Technology advancements", correct: false },
            { id: "b", text: "Environmental issues", correct: true },
            { id: "c", text: "Space exploration", correct: false },
            { id: "d", text: "Economic policies", correct: false },
        ],
    };

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handleAnswerSelect = (answerId: string) => {
        setSelectedAnswer(answerId);
    };

    const handleCheckAnswer = () => {
        const correctOption = question.options.find(option => option.correct);
        setIsCorrect(selectedAnswer === correctOption?.id);
    };

    return (
        <div className="listening-practice">
            <header className="header">
                <h1 className="title">English Listening Practice</h1>
            </header>

            <main className="main-content">
                <div className="audio-section">
                    <button className="play-button" onClick={handlePlayAudio}>▶ Play Audio</button>
                    <audio ref={audioRef} src={question.audioSrc}></audio>
                </div>

                <div className="question-section">
                    <h2 className="question-text">{question.text}</h2>
                    <ul className="options">
                        {question.options.map(option => (
                            <li key={option.id} className="option-item">
                                <label className="option-label">
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={option.id}
                                        onChange={() => handleAnswerSelect(option.id)}
                                        checked={selectedAnswer === option.id}
                                    />
                                    {option.text}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <button onClick={handleCheckAnswer} className="check-answer-button">
                    Check Answer
                </button>

                {isCorrect !== null && (
                    <div className={`result ${isCorrect ? "correct" : "incorrect"}`}>
                        {isCorrect ? "✅ Correct!" : "❌ Incorrect, try again."}
                    </div>
                )}
            </main>

            <footer className="footer">
                <p className="footer-text">&copy; 2024 English Listening Practice. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ListeningPractice;
