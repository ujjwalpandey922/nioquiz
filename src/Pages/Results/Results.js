import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Results.css";
function Results({ time, name, setTime ,setQuestions,questions }) {
  const NavTo = useNavigate();
  useEffect(() => {
    if (!name) {
      NavTo("/");
    }
    //eslint-disable-next-line
  }, [name, NavTo]);
  console.log(questions)
  return (
    <div className="result">
      <span className="timeTaken">
        <strong>Time Taken:</strong> {questions?.timeTaken}
      </span>

      {[questions?.result].map((result, index) => (
        <div key={index} >
          {Object.entries(result).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
      ))}

      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        onClick={() => {
          setQuestions([]);
          setTime(0);
          NavTo("/");
        }}
      >
        {" "}
        GO TO HOME PAGE
      </Button>
    </div>
  );
}

export default Results;
