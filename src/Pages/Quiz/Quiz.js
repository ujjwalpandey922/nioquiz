import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";
function Quiz({ name, questions, setQuestions, time, setTime }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  useEffect(() => {
    setTime(questions.length * 5 * 60);
  }, [questions]);
 
  useEffect(() => {
    const overallTimer = setTimeout(() => {
      if (time > 0) {
        setTime((pre) => pre - 1);
      }
    }, 1000);
    // Clear the timer when time reaches 0
    if (time === 0) {
      clearTimeout(overallTimer);
    }
    return () => clearTimeout(overallTimer);
    // eslint-disable-next-line
  }, [time]);
  const timeRemainingFn = (time) => {
    let min = 0;
    let sec = 0;
    min = Math.floor((time)/60);
    sec = Math.floor((time) % 60);
    return `${min} M : ${sec} Sec`;
  };
  return (
    <div className="quiz">
      <span className="subTitle">Welcome : {name}</span>
      {time ? (
        <>
          <div className="quizInfo">
            <span>{questions[currentQuestion]?.QuestionID}</span>
            <span>Total Time Remaining : {timeRemainingFn(time)}</span>
          </div>
          <Question
            questions={questions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            time={time}
            timeRemainingFn={timeRemainingFn}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
}

export default Quiz;
