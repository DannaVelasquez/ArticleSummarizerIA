import Button from "@mui/material/Button";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TextField from "@mui/material/TextField";
import "./home.styles.css";

function Home() {
  return (
    <>
      <div className="container">
        <h1>
          Welcome to Article Summarizer IA
          <DescriptionOutlinedIcon fontSize="large" />
        </h1>
        <TextField
          id="outlined-basic"
          label="Submit your article URL here"
          variant="outlined"
        />
        <Button variant="contained">RESUME NOW</Button>
      </div>
    </>
  );
}

export default Home;
