import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import "./resume.styles.css";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

interface UrlItem {
  id: number;
  url: string;
  summary: string;
}

interface ResumeViewProps {
  summary: string;
}

function ResumeView({ summary }: ResumeViewProps) {
  const [showPanel, setShowPanel] = useState(false);
  const [storedUrls, setStoredUrls] = useState<UrlItem[]>([]);
  const [selectedSummary, setSelectedSummary] = useState<string>("");
  const [hasData, setHasData] = useState<boolean>(false);

  console.log('stored', storedUrls)

  //Panel searched articles
  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  useEffect(() => {
    // Get LocalStorage information
    const storedUrlsJson = localStorage.getItem("urls");

    if (storedUrlsJson) {
      const urls: UrlItem[] = JSON.parse(storedUrlsJson);
      setStoredUrls(urls);
      setHasData(true); 
    }
  }, [storedUrls]);

  const handleDelete = (id: number) => {
    const updatedUrls = storedUrls.filter((item) => item.id !== id);
    setStoredUrls(updatedUrls);
    // Local storage update
    localStorage.setItem("urls", JSON.stringify(updatedUrls));

    // Clear summary view when a selectedItem is deleted
    if (selectedSummary && storedUrls.find((item) => item.id === id)) {
      setSelectedSummary("");
      setHasData(false);
    }
  };

  const handleItemClick = (id: number) => {
    const selectedItem = storedUrls.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedSummary(selectedItem.summary);
    }
  };

  return (
    <div id="resume" className="cover-resume">
      <IconButton
        onClick={togglePanel}
        color="primary"
        style={{
          color: "black",
          borderRadius: "0px",
          flexDirection: "column",
          width: "50px",
        }}
      >
        <span
          style={{
            transform: "rotate(-90deg)",
            width: "max-content",
            display: "flex",
            gap: "50px",
          }}
        >
          Searched Articles{" "}
          {showPanel ? (
            <ArrowBackIosOutlinedIcon style={{ transform: "rotate(90deg)" }} />
          ) : (
            <ArrowForwardIosOutlinedIcon
              style={{ transform: "rotate(90deg)", alignSelf: "center" }}
            />
          )}
        </span>
      </IconButton>
      <div className="panel" style={{ display: showPanel ? "block" : "none" }}>
        <h2>Searched Articles</h2>
        <ul className="list">
          {storedUrls.map((item) => (
            <li
              className="item-list"
              key={item.id}
            >
              <div className="url-container">
                <span className="url-text">{item.url}</span>
                <IconButton
                  onClick={() => handleItemClick(item.id)}
                  color="primary"
                  style={{
                    marginLeft: "10px",
                    padding: "0",
                    color: "yellowgreen",
                  }}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(item.id)}
                  color="primary"
                  style={{
                    marginLeft: "10px",
                    padding: "0",
                    color: "lightslategrey",
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-resume">
        <div className="content">
          <h1>
            Your resume here{" "}
            <TaskAltOutlinedIcon
              fontSize="large"
              style={{
                marginLeft: "5px",
                marginBottom: "-5px",
                color: "rgba(153, 205, 50, 0.63)",
              }}
            />
          </h1>
          <Card>
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ textAlign: "justify" }}
              >
                {hasData ? (selectedSummary ? selectedSummary : summary ? summary : " ") : " "}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </div>
  );
}

export default ResumeView;

