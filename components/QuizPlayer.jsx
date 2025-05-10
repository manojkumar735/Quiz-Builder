import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './QuizPlayer.css';

const QuizPlayer = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Mock quiz data - replace with actual API call
  useEffect(() => {
    // Simulating an API call to fetch quiz data
    const fetchQuizData = () => {
      // This is mock data - replace with actual API call
      const mockQuizzes = {
        1: {
          title: "people",
          description: "about ethiopian people",
          totalScore: 20,
          questions: [
            {
              id: 1,
              question: "Who was the last emperor of Ethiopia before its monarchy was abolished?",
              options: [
                "Menelik II",
                "Haile Selassie",
                "Tewodros II",
                "Abebe Bikila"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "What is the capital of Ethiopia?",
              options: [
                "Nairobi",
                "Addis Ababa",
                "Asmara",
                "Djibouti"
              ],
              correctAnswer: 1
            }
          ]
        }
      };

      const quiz = mockQuizzes[quizId];
      if (quiz) {
        setQuizData(quiz);
      } else {
        navigate('/dashboard');
      }
    };

    fetchQuizData();
  }, [quizId, navigate]);

  const handleOptionSelect = (index) => {
    if (!hasAnswered) {
      setSelectedOption(index);
      setHasAnswered(true);
      if (index === quizData.questions[currentQuestionIndex].correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
      navigate('/quiz-results', {
        state: {
          score: score,
          totalQuestions: quizData.questions.length,
          quizTitle: quizData.title
        }
      });
    }
  };

  const getOptionClassName = (index) => {
    if (!hasAnswered) {
      return `option ${selectedOption === index ? 'selected' : ''}`;
    }
    
    if (index === quizData.questions[currentQuestionIndex].correctAnswer) {
      return 'option correct';
    }
    
    if (selectedOption === index) {
      return 'option wrong';
    }
    
    return 'option';
  };

  if (!quizData) {
    return <div className="quiz-player-container">Loading...</div>;
  }

  return (
    <div className="quiz-player-container">
      <div className="quiz-warning">
        <p className="warning-text">--- You can attemp Quiz as many time as you want but the score will only be calculated for the first attemp. ---</p>
        <p className="warning-text warning-refresh">--- Please do not refresh your page ---</p>
      </div>

      <div className="quiz-content">
        <div className="quiz-header">
          <div className="quiz-title">
            <h2>Quiz Title : <span className="title-text">{quizData.title}</span></h2>
          </div>
          <div className="quiz-score">
            <h2>Total Score : {score}/{quizData.questions.length}</h2>
          </div>
        </div>

        <div className="quiz-description">
          <p>Quiz Description : {quizData.description}</p>
        </div>

        {!isFinished && (
          <>
            <div className="question-container">
              <h3 className="question-text">
                Q : {currentQuestionIndex + 1} {'>>'} {quizData.questions[currentQuestionIndex].question}
              </h3>

              <div className="options-container">
                <p className="options-label">Options :-</p>
                {quizData.questions[currentQuestionIndex].options.map((option, index) => (
                  <div 
                    key={index}
                    className={getOptionClassName(index)}
                    onClick={() => handleOptionSelect(index)}
                  >
                    {index + 1}. {option}
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="next-button"
              onClick={handleNext}
              disabled={!hasAnswered}
            >
              {currentQuestionIndex === quizData.questions.length - 1 ? 'Finish' : 'NEXT'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPlayer; 