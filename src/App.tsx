
import './App.css'
import ChatBot from './Components/ChatbotView/ChatBot'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Resume from './Components/ResumeView/ResumeView'

function App() {

  return (
    <>
    <Header/>
      <Home/>
      <Resume/>
    <ChatBot/>
    </>
  )
}

export default App
