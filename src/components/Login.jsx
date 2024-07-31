import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import {
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// toggle visibility password hanya muncul double di dev env saja
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Define schema using Zod
const schema = z.object({
  username: z
    .string()
    .min(8, { message: "Username must be at least 8 characters" })
    .regex(/^[a-z|0-9]+$/, {
      message: "Username must contain only lowercase letters without spaces",
    })
    .regex(/^\S*$/, { message: "Username must not contain spaces" }), // No spaces allowed
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[a-z|A-Z]/, {
      message: "Password must contain at least one letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

const Login = () => {
  const classes = useStyles();
  const { setUser, setQuizState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setUser({ username: data.username });
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      timer: 60,
      questions: [],
    });
    navigate("/quiz");
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ""}
                autoFocus
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
            style={{ margin: "20px 0" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
