import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TextField from "@mui/material/TextField";
import "./home.styles.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface HomeProps {
  onSummaryChange: (summary: string) => void;
  onUrlChange: (summary: string) => void;
}

function Home({ onSummaryChange, onUrlChange }: HomeProps) {
  const [articleUrl, setArticleUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [urls, setUrls] = useState<{ id: number; url: string }[]>(() => {
    const storedUrls = localStorage.getItem("urls");
    return storedUrls ? JSON.parse(storedUrls) : [];
  });

  //Save articles url searched in local storage
  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urls));
  }, [urls]);

  const handleResumeNowClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articleUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize article");
      }

      const data = await response.json();
      onSummaryChange(data.summary);

      setUrls([...urls, { id: urls.length + 1, url: articleUrl }]);

      //After search, scroll down to the resumeView
      const nextSection = document.getElementById("resume");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
      onUrlChange(articleUrl);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cover">
      <div className="container">
        <h1 style={{ fontSize: "50px" }}>
          Welcome to Article Summarizer IA
          <DescriptionOutlinedIcon fontSize="large" />
        </h1>
        <TextField
          id="outlined-basic"
          label="Submit your article URL here"
          variant="outlined"
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
        />
        <Button variant="contained" onClick={handleResumeNowClick}>
          RESUME NOW
        </Button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
}

export default Home;
