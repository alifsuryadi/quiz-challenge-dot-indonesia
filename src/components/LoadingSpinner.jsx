// components/LoadingSpinner.jsx
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  spinner: {
    display: "inline-block",
    width: "80px",
    height: "80px",
    "&:after": {
      content: '""',
      display: "block",
      width: "64px",
      height: "64px",
      margin: "8px",
      borderRadius: "50%",
      border: "6px solid #8BC34A",
      borderColor: "#8BC34A transparent #8BC34A transparent",
      animation: "$spin 1.2s linear infinite",
    },
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  container: {
    height: "100vh", // Full viewport height
    width: "100vw", // Full viewport width
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Optional: background color for better visibility
  },
}));

const LoadingSpinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
