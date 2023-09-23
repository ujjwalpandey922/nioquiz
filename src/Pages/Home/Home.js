import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Categories from "../../Category/Categories";
import "./Home.css";
import { Button, FormControl, MenuItem,  OutlinedInput,  Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error/Error";
function Home({ name, setName, fetchQuiz }) {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(false);
  const NavTo = useNavigate();
  const handleSubmit = () => {
    if (!name || !category) {
      setError(true);
      return;
    } else {
      setError(false);
      category.forEach((element) => {
        fetchQuiz(element);
      });
      NavTo("/quiz");
    }
  };
  return (
    <div className="content">
      <div className="setting">
        <span style={{ fontSize: 30 }}>Quiz Setting</span>
        <div className="setting_selected">
          {error && <Error>please enter all the fields</Error>}
          <TextField
            id="Name"
            variant="outlined"
            placeholder="Enter Name Please..."
            InputProps={{
              style: { color: "white", fontSize: "24px" }, // Set the text color to white
            }}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            multiple
            id="category"
            variant="outlined"
            style={{ color: "white", fontSize: "24px" }}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <MenuItem disabled value="">
              Select Questions
            </MenuItem>
            {Categories.map((e) => (
              <MenuItem key={e.category} value={e.value}>
                {e.category}
              </MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <img src="/banner.svg" alt="homeimg" className="Banner" />
    </div>
  );
}

export default Home;
