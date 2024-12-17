// components/Quiz.jsx
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../App";
import he from "he";
import LoadingSpinner from "./LoadingSpinner"; // Import the LoadingSpinner component

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  paper: {
    padding: theme.spacing(4),
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
    margin: "0 20px",
  },
  timer: {
    marginBottom: theme.spacing(2),
    textAlign: "right",
  },
  questionInfo: {
    marginBottom: theme.spacing(2),
    textAlign: "left",
  },
  answerButton: {
    margin: theme.spacing(2, 0),
  },
}));

const Quiz = () => {
  const classes = useStyles();
  const { quizState, setQuizState } = useContext(AuthContext);
  const { currentQuestionIndex, score, timer, questions } = quizState || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!questions || questions.length === 0) {
        const res = await axios.get(
          process.env.REACT_APP_QUIZ_API_URL
        );
        setQuizState((prevState) => ({
          ...prevState,
          questions: res.data.results,
        }));
      }
    };

    fetchQuestions();
  }, [questions, setQuizState]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setQuizState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
        }));
      }, 1000);
      return () => clearInterval(interval);
    } else if (questions) {
      navigate("/results", { state: { score, total: questions.length } });
    }
  }, [timer, navigate, score, questions, setQuizState]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect)
      setQuizState((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
      }));
    const nextIndex = currentQuestionIndex + 1;
    if (questions && nextIndex < questions.length) {
      setQuizState((prevState) => ({
        ...prevState,
        currentQuestionIndex: nextIndex,
      }));
    } else {
      navigate("/results", { state: { score, total: questions.length } });
    }
  };

  if (!questions || questions.length === 0) return <LoadingSpinner />;

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ].sort();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6" className={classes.timer}>
          Time Remaining: {timer}s
        </Typography>
        <Typography variant="h6" className={classes.questionInfo}>
          Question {currentQuestionIndex + 1}/{questions.length}
        </Typography>
        <Typography variant="h5" style={{ margin: "16px 0" }}>
          {he.decode(currentQuestion.question)}
        </Typography>
        {answers.map((answer) => (
          <Button
            key={answer}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.answerButton}
            style={{ margin: "5px 0px" }}
            onClick={() =>
              handleAnswer(answer === currentQuestion.correct_answer)
            }
          >
            {he.decode(answer)}
          </Button>
        ))}
      </Paper>
    </div>
  );
};

export default Quiz;
