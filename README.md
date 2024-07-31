<h1 align="center">Quiz App</h1>

<div align="center">

![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)&nbsp;
![React](https://img.shields.io/badge/-React-05122A?style=flat&logo=react)&nbsp;
![Material-UI](https://img.shields.io/badge/-Material--UI-05122A?style=flat&logo=material-ui)&nbsp;
![React Router](https://img.shields.io/badge/-React%20Router-05122A?style=flat&logo=react-router)&nbsp;
![Axios](https://img.shields.io/badge/-Axios-05122A?style=flat&logo=axios)&nbsp;
![Zod](https://img.shields.io/badge/-Zod-05122A?style=flat&logo=zod)&nbsp;

</div>

<p align="center">Quiz App is a React-based web application that allows users to log in, take quizzes, and view their results. The application uses React Router for routing, Material-UI for styling, and Axios for API requests.</p>

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [File and Folder Structure](#file-and-folder-structure)
- [Components](#components)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)

## Tech Stack

- **JavaScript**: Primary programming language used for the project.
- **React**: Library for building user interfaces.
- **Material-UI**: UI component library for React.
- **React Router**: Library for handling routing in React applications.
- **Axios**: Promise-based HTTP client for making API requests.

## File and Folder Structure

| File/Folder Name             | Description                     |
| ---------------------------- | ------------------------------- |
| `src/App.jsx`                | Main application component.     |
| `src/main.jsx`               | Entry point of the application. |
| `src/components/Login.jsx`   | Component for the login page.   |
| `src/components/Quiz.jsx`    | Component for the quiz page.    |
| `src/components/Results.jsx` | Component for the results page. |

## Components

- **App.jsx**: Manages the user authentication state and quiz state, and provides routing for the application.
- **Login.jsx**: Provides a login form for users to enter their username and password.
- **Quiz.jsx**: Fetches quiz questions from an API and handles the quiz logic, including timing and scoring.
- **Results.jsx**: Displays the user's quiz results and provides an option to retry the quiz.

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/alifsuryadi/quiz-challenge-dot-indonesia.git
   cd quiz-challenge-dot-indonesia
   ```
2. **Install dependencies:**

   ```sh
   npm install pnpm
   pnpm install

   ```

3. **Start the development server:**

   ```sh
   pnpm run dev

   ```

   > **NOTE**: The application will be available at `http://localhost:5173.`

## Usage

- `Login:` Enter a username and password to log in.
- `Take Quiz:` Answer the questions within the given time limit.
- `View Results:` See the number of correct answers and retry the quiz if desired.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
