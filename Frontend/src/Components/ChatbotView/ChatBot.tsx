import axios from 'axios';
import './chatbot.styles.css'
import { useState } from 'react';

function ChatBot() {

  const [userInput, setUserInput] = useState('');
  
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Enviamos el mensaje del usuario al servidor
    try {
      const response = await axios.post('http://localhost:3000/api/chat', { message: userInput});
      const chatResponse = response.data.message;
      setChatHistory([...chatHistory, userInput, chatResponse]);
      setUserInput('');
    } catch (error) {
      console.error('Error al enviar mensaje al servidor:', error);
    }
  };


  return (
    <div>
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Escribe tu mensaje aquí..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default ChatBot;
