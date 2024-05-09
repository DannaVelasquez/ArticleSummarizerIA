import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import "./chatbot.styles.css";

function ChatBot({ articleUrl }: { articleUrl: string }) {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { message: string; fromUser: boolean }[]
  >([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [chatIcon, setChatIcon] = useState(
    <SmartToyOutlinedIcon fontSize="large" />
  );

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setChatIcon(
      isChatOpen ? (
        <SmartToyOutlinedIcon fontSize="large" />
      ) : (
        <CloseIcon fontSize="large" />
      )
    );
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    try {
      const chatMessage = { message: userInput, fromUser: true };
      setChatHistory([...chatHistory, chatMessage]);
      setUserInput("");
      setIsBotTyping(true);

      let response;
      if (articleUrl) {
        response = await axios.post("http://localhost:3000/api/chat", {
          message: userInput,
          articleUrl: articleUrl,
        });
      } else {
        response = {
          data: {
            message:
              "Hi, please submit the article URL you want to chat about in the text box above",
          },
        };
      }

      setIsBotTyping(false);

      const chatResponse = response.data.message;
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { message: chatResponse, fromUser: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];
    if (lastMessage && lastMessage.fromUser === false) {
      setIsBotTyping(false);
    }
  }, [chatHistory]);

  //Scroll to last message in chat history
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  //Enter key enabled to click send button
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={`chat-container ${isChatOpen ? "open" : ""}`}>
      <div className="title-chat">
        <p className={`title-container ${isChatOpen ? "open" : ""}`}>
          Shall we explore the article together?
        </p>
        <div className="icon-container" onClick={toggleChat}>
          {chatIcon}
        </div>
      </div>
      {isChatOpen && (
        <div className="chatbox">
          <div className="chat-history">
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={entry.fromUser ? "user-message" : "bot-message"}
              >
                {entry.fromUser ? (
                  <UserIcon />
                ) : isBotTyping ? (
                  <TypingIndicator />
                ) : (
                  <BotIcon />
                )}
                {entry.message}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="input-chatbox">
            <TextField
              id="standard-basic"
              variant="standard"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Start chat here..."
              style={{ borderColor: "yellowgreen" }}
              onKeyDown={handleKeyDown}
            />
            <IconButton
              onClick={sendMessage}
              color="primary"
              style={{ color: "yellowgreen" }}
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}

const TypingIndicator = () => (
  <div className="typing-indicator">
    <span className="dot">.</span>
    <span className="dot">.</span>
    <span className="dot">.</span>
  </div>
);

const UserIcon = () => <PersonOutlineOutlinedIcon />;
const BotIcon = () => <SmartToyOutlinedIcon />;

export default ChatBot;
