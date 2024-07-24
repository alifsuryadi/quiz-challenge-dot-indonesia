// app.jsx
import { useState, createContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

const AuthContext = createContext();

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [quizState, setQuizState] = useState(() => {
    const savedState = localStorage.getItem("quizState");
    return savedState
      ? JSON.parse(savedState)
      : { currentQuestionIndex: 0, score: 0, timer: 60, questions: [] };
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("quizState", JSON.stringify(quizState));
  }, [quizState]);

  return (
    <AuthContext.Provider value={{ user, setUser, quizState, setQuizState }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route
          path="/"
          element={user ? <Navigate to="/quiz" /> : <Navigate to="/login" />}
        />
      </Routes>
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default App;
