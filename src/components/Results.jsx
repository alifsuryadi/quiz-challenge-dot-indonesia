import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { Typography, Button, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
}));

const Results = () => {
  const classes = useStyles();
  const { user, setQuizState } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state;

  const handleRetry = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      timer: 60,
      questions: [],
    });
    navigate("/quiz");
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" style={{ fontWeight: "bold", margin: "10px" }}>
          Results
        </Typography>
        <Typography variant="h6">Name: {user.username}</Typography>
        <Typography variant="h6">Correct Answers: {score}</Typography>
        <Typography variant="h6">Total Questions: {total}</Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRetry}
          style={{ margin: "20px 0" }}
        >
          Retry Quiz
        </Button>
      </Paper>
    </div>
  );
};

export default Results;
