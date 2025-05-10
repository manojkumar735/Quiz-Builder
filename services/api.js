import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);

// Quiz API calls
export const getQuizzes = () => api.get('/quizzes');
export const getQuiz = (id) => api.get(`/quizzes/${id}`);
export const createQuiz = (quizData) => api.post('/quizzes', quizData);
export const updateQuiz = (id, quizData) => api.put(`/quizzes/${id}`, quizData);
export const deleteQuiz = (id) => api.delete(`/quizzes/${id}`);

// Score API calls
export const getUserScores = () => api.get('/scores/user');
export const submitScore = (scoreData) => api.post('/scores', scoreData);
export const getQuizLeaderboard = (quizId) => api.get(`/scores/quiz/${quizId}`);

export default api; 