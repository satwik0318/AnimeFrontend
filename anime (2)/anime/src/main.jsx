import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AppContextProvider } from './LoginPage/Context/Appcontext.jsx';
import { ChatProvider } from './LoginPage/Context/ChatContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <ChatProvider>
      <App />
      </ChatProvider>
    </AppContextProvider>
  </StrictMode>
);
