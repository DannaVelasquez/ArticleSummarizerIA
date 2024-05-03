import Button from "@mui/material/Button";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TextField from "@mui/material/TextField";
import "./home.styles.css";

function Home() {

  const handleResumeNowClick = () => {
    const nextSection = document.getElementById('resume');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="cover">
      <div className="container">
        <h1 style={{fontSize:'50px'}}>
          Welcome to Article Summarizer IA
          <DescriptionOutlinedIcon fontSize="large" />
        </h1>
        <TextField
          id="outlined-basic"
          label="Submit your article URL here"
          variant="outlined"
          style={{fontWeight:'bold', color:'blue'}}
        />
        <Button variant="contained" onClick={handleResumeNowClick}>RESUME NOW</Button>
      </div>
    </div>
  );
}

export default Home;
