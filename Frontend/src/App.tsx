
import { useState } from 'react'
import './App.css'
import ChatBot from './Components/ChatbotView/ChatBot'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import ResumeView from './Components/ResumeView/ResumeView'

function App() {

  const [summary, setSummary] = useState<string>('');
  const [articleUrl, setArticleUrl] = useState<string>("");

  const handleSummaryChange = (newSummary: string) => {
    setSummary(newSummary);
  };

  const handleUrlChange = (newUrl: string) => {
    setArticleUrl(newUrl);
  };

  return (
    <>
    <Header/>
    <Home onSummaryChange={handleSummaryChange} onUrlChange={handleUrlChange}  />
      <ResumeView summary={summary} />
      
    <ChatBot articleUrl={articleUrl} />
    </>
  )
}

export default App
