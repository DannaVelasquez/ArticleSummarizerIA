import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TextField from "@mui/material/TextField";
import "./home.styles.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";
import ClearIcon from "@mui/icons-material/Clear";

interface HomeProps {
  onSummaryChange: (summary: string) => void;
  onUrlChange: (summary: string) => void;
}

function Home({ onSummaryChange, onUrlChange }: HomeProps) {
  const [articleUrl, setArticleUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [urls, setUrls] = useState<
    { id: number; url: string; summary: string }[]
  >(() => {
    const storedUrls = localStorage.getItem("urls");
    console.log('storedHome', storedUrls)
    return storedUrls ? JSON.parse(storedUrls) : [];
  });

  const [error, setError] = useState<string>("");
  const [showClearButton, setShowClearButton] = useState<boolean>(false);
  const handleCloseError = () => {
    setError("");
  };

  console.log('urls', urls)
  //Save articles url searched in local storage
  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urls));
  }, [urls]);

  // Update state from localStorage
  useEffect(() => {
    const storedUrls = localStorage.getItem("urls");
    if (storedUrls) {
      setUrls(JSON.parse(storedUrls));
    }
  }, []);

  const handleResumeNowClick = async () => {
    if (!articleUrl) {
      setError("Please enter a URL.");
      return;
    }

    // Validate URL submitted
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlRegex.test(articleUrl)) {
      setError("Please enter a valid URL.");
      return;
    }
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

      // Update urls state
      const newUrl = { id: urls.length + 1, url: articleUrl, summary: data.summary };
      setUrls([...urls, newUrl]);

      // After search, scroll down to the resumeView
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setArticleUrl(value);
    setShowClearButton(!!value);
  };

  const handleClearInput = () => {
    setArticleUrl("");
    setShowClearButton(false);
  };


  return (
    <div id="home" className="cover">
      <div className="container">
        <h1 style={{ fontSize: "50px" }}>
          Welcome to Article Summarizer IA
          <DescriptionOutlinedIcon fontSize="large" />
        </h1>
        <div style={{ position: "relative" }}>
          <TextField
            id="outlined-basic"
            label="Submit your article URL here"
            variant="outlined"
            value={articleUrl}
            onChange={handleInputChange}
          />
          {showClearButton && (
            <Button
              style={{
                position: "absolute",
                right: 0,
                top: "20%",
                color: "yellowgreen",
              }}
              onClick={handleClearInput}
            >
              <ClearIcon />
            </Button>
          )}
        </div>
        <Button variant="contained" onClick={handleResumeNowClick}>
          RESUME NOW
        </Button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ position: "fixed", top: 400, right: 0, zIndex: 9999 }}
        >
          <Grid item>
            {error && (
              <Alert severity="error" onClose={handleCloseError}>
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Home;
