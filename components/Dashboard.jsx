import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ userEmail }) => {
  const navigate = useNavigate();

  const quizzes = [
    {
      id: 1,
      title: "ECLECTIC QUIZ",
      description: "Test your trivia skills with this eclectic quiz that covers a wide range of topics. From science to pop culture, history to geography, challenge yourself to answer these 10 random questions. Good luck!",
      createdBy: "lokendra@gmail.com",
      questions: 10
    },
    {
      id: 2,
      title: "NODE.JS QUIZ",
      description: "Test your knowledge of Node.js, a popular runtime environment for executing JavaScript code on the server side. This quiz will challenge your understanding of Node.js concepts, modules, and best practices. Good luck!",
      createdBy: "lokendra@gmail.com",
      questions: 5
    },
    {
      id: 3,
      title: "JAVASCRIPT QUIZ",
      description: "Test your knowledge of JavaScript, one of the most widely used programming languages for web development. This quiz covers a range of JavaScript topics, from basics to advanced concepts. How well do you know JavaScript? Let's find out!",
      createdBy: "menu@gmail.com",
      questions: 2
    }
  ];

  const handleCreateQuiz = () => {
    navigate('/create-quiz');
  };

  const handleTakeQuiz = (quizId) => {
    navigate(`/take-quiz/${quizId}`);
  };

  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">Quick Quizzer</div>
        <div className="user-info">
          Welcome 👋 {userEmail}
          <Link to="/logout" className="logout-btn">Logout</Link>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="create-quiz-container">
          <button className="create-quiz-btn" onClick={handleCreateQuiz}>
            Create Quiz
          </button>
        </div>

        <div className="quizzes-grid">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <h2>{quiz.title}</h2>
              <p className="quiz-description">{quiz.description}</p>
              <div className="quiz-meta">
                <p>Created By : {quiz.createdBy}</p>
                <p>Questions : {quiz.questions}</p>
              </div>
              <div className="quiz-actions">
                <button 
                  className="take-quiz-btn"
                  onClick={() => handleTakeQuiz(quiz.id)}
                >
                  Take Quiz
                </button>
                <button className="leaderboard-btn" onClick={handleLeaderboard}>
                  Leaderboard
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 