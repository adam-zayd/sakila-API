import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/main/HomePage.tsx'
import FilmsPage from './pages/main/FilmsPage.tsx'
import Navbar from './components/Navbar.tsx'
import SpecificFilmPage from './pages/Specific/SpecificFilmPage.tsx'
import ActorsPage from './pages/main/ActorsPage.tsx'
import CategoriesPage from './pages/main/CategoryPage.tsx'
import StreamsPage from './pages/main/StreamsPage.tsx'
import SpecificActorPage from './pages/Specific/SpecificActorPage.tsx'
import SpecificCategoryPage from './pages/Specific/SpecificCategoryPage.tsx'
import SpecificStreamingPage from './pages/Specific/SpecificStreamingPage.tsx'
import CreateFilmsPage from './pages/Create/CreateFilmsPage.tsx'
import CreateActorsPage from './pages/Create/CreateActorsPage.tsx'
import UpdateActorPage from './pages/Update/UpdateActorPage.tsx'
import UpdateFilmPage from './pages/Update/UpdateFilmPage.tsx'
import CreateCategoriesPage from './pages/Create/CreateCategoriesPage.tsx'
import CreateStreamsPage from './pages/Create/CreateStreamsPage.tsx'
import UpdateCategoryPage from './pages/Update/UpdateCategoryPage.tsx'
import UpdateStreamingPage from './pages/Update/UpdateStreamingPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>

      <Route path="/films" element={<FilmsPage />} />
      <Route path="/films/create" element={<CreateFilmsPage />} />
      <Route path="/films/:id" element={<SpecificFilmPage />} />
      <Route path="/films/:id/update" element={<UpdateFilmPage />} />

      <Route path="/actors" element={<ActorsPage />} />
      <Route path="/actors/create" element={<CreateActorsPage />} />
      <Route path="/actors/:id" element={<SpecificActorPage />} />
      <Route path="/actors/:id/update" element={<UpdateActorPage />} />

      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/create" element={<CreateCategoriesPage />} />
      <Route path="/categories/:id" element={<SpecificCategoryPage />} />
      <Route path="/categories/:id/update" element={<UpdateCategoryPage />} />

      <Route path="/streams" element={<StreamsPage />} />
      <Route path="/streams/create" element={<CreateStreamsPage />} />
      <Route path="/streams/:id" element={<SpecificStreamingPage />} />
      <Route path="/streams/:id/update" element={<UpdateStreamingPage />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
