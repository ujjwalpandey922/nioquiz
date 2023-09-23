import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./Question.css";
import { useEffect } from "react";
function Question({
  questions,
  currentQuestion,
  setCurrentQuestion,
  timeRemainingFn,
  setQuestions,
  time,
}) {
  const [timeElapsed, setTimeElapsed] = useState({});
  const [localTimer, setlocalTimer] = useState(0);
  const NavTo = useNavigate();
  //Individual Timer
  useEffect(() => {
    // Start a timer when a new question is displayed
    let timer;
    const questionID = questions[currentQuestion]?.QuestionID;
    // Update timeElapsed for the current question
    if (timeElapsed[questionID]) {
      setlocalTimer(timeElapsed[questionID]);
    } else {
      setlocalTimer(0);
    }
    timer = setInterval(() => {
      setlocalTimer((prevTime) => prevTime + 1);
    }, 1000);
    // Clear the timer when the component unmounts or when a new question is displayed
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, [currentQuestion, questions]);
  //changing time elapsed with every sec
  useEffect(() => {
    if (questions[currentQuestion]) {
      // Get the current question's ID
      const questionID = questions[currentQuestion]?.QuestionID;
      // Update timeElapsed for the current question
      setTimeElapsed((prevTimeElapsed) => ({
        ...prevTimeElapsed,
        [questionID]: localTimer, // Store the elapsed time for this question
      }));
    }
  }, [currentQuestion, localTimer, questions]);
  //HANDLE NEXT
  const handleNext = () => {
    if (currentQuestion >= questions.length) NavTo("/result");
    else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  //HANDLE Pre
  const handlePre = () => {
    setCurrentQuestion(currentQuestion - 1);
  };
  //HANDLE Quit
  const handleQuit = () => {
    const updatedTimeElapsed = {};
    Object.entries(timeElapsed).forEach(([key, value]) => {
      updatedTimeElapsed[key] = timeRemainingFn(value);
    });
    const totalTimeTaken = 5 * 60 * questions.length - time;
    const RemainingTotalTime = timeRemainingFn(totalTimeTaken);
    setQuestions((pre) => ({
      ...pre,
      result: updatedTimeElapsed,
      timeTaken: RemainingTotalTime,
    }));

    NavTo("/result");
  };
  if (time === 0) {
    handleQuit();
  }
  const config = {
    tex: {
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
    },
  };
  return (
    <MathJaxContext
      config={config}
      src={"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"}
    >
      <div className="ques">
        <h1>Question - {currentQuestion + 1}</h1>

        <div className="singleQuestion">
          <h3>
            <MathJax>{questions[currentQuestion]?.Question}</MathJax>
          </h3>

          <div className="controls">
            {currentQuestion > 0 && (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ width: 185 }}
                onClick={handlePre}
              >
                Previous
              </Button>
            )}
            <Button
              variant="contained"
              color="warning"
              size="large"
              style={{ width: 185 }}
              onClick={handleQuit}
            >
              Submit
            </Button>
            {currentQuestion < questions.length - 1 && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ width: 185 }}
                onClick={handleNext}
              >
                Next Question
              </Button>
            )}
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default Question;
