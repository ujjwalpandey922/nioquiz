import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Quiz from "./Pages/Quiz/Quiz";
import Home from "./Pages/Home/Home";
import Results from "./Pages/Results/Results";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState(0);
  const fetchQuiz = async (category) => {
    const res = await fetch(
      `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiond
etails?QuestionID=${category}`
    );
    const data = await res.json();
    console.log(data);
    setQuestions((prev) => [ ...prev, data[0]]);
  };
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home name={name} setName={setName} fetchQuiz={fetchQuiz} />
            }
          ></Route>
          <Route
            path="/quiz"
            element={
              <Quiz
                name={name}
                questions={questions}
                time={time}
                setTime={setTime}
                setQuestions={setQuestions}
              />
            }
          ></Route>
          <Route
            path="/result"
            element={
              <Results
                name={name}
                time={time}
                setTime={setTime}
                setQuestions={setQuestions}
                questions={questions}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
