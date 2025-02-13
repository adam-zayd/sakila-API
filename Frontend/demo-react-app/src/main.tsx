import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage.tsx'
import FilmsPage from './pages/FilmsPage.tsx'
import Navbar from './components/Navbar.tsx'
import SpecificFilmPage from './pages/SpecificFilmPage.tsx'
import ActorsPage from './pages/ActorsPage.tsx'
import CategoriesPage from './pages/CategoryPage.tsx'
import StreamsPage from './pages/StreamsPage.tsx'
import SpecificActorPage from './pages/SpecificActorPage.tsx'
import SpecificCategoryPage from './pages/SpecificCategoryPage.tsx'
import SpecificStreamingPage from './pages/SpecificStreamingPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/films" element={<FilmsPage />} />
      <Route path="/actors" element={<ActorsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/streams" element={<StreamsPage />} />
      <Route path="/films/:id" element={<SpecificFilmPage />} />
      <Route path="/actors/:id" element={<SpecificActorPage />} />
      <Route path="/categories/:id" element={<SpecificCategoryPage />} />
      <Route path="/streams/:id" element={<SpecificStreamingPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
