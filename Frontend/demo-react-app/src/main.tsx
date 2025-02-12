import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage.tsx'
import FilmsPage from './pages/FilmsPage.tsx'
import Navbar from './components/Navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/films" element={<FilmsPage />} />
      <Route path="/films/:index" element={<FilmsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
