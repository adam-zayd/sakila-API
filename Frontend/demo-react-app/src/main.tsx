import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/main/HomePage.tsx'
import FilmsPage from './pages/main/FilmsPage.tsx'
import Navbar from './components/Navbar.tsx'
import SpecificFilmPage from './pages/specific/SpecificFilmPage.tsx'
import ActorsPage from './pages/main/ActorsPage.tsx'
import CategoriesPage from './pages/main/CategoryPage.tsx'
import StreamsPage from './pages/main/StreamsPage.tsx'
import SpecificActorPage from './pages/specific/SpecificActorPage.tsx'
import SpecificCategoryPage from './pages/specific/SpecificCategoryPage.tsx'
import SpecificStreamingPage from './pages/specific/SpecificStreamingPage.tsx'
import CreateFilmsPage from './pages/create/CreateFilmsPage.tsx'
import CreateActorsPage from './pages/create/CreateActorsPage.tsx'
import UpdateActorPage from './pages/update/UpdateActorPage.tsx'
import UpdateFilmPage from './pages/update/UpdateFilmPage.tsx'
import CreateCategoriesPage from './pages/create/CreateCategoriesPage.tsx'
import CreateStreamsPage from './pages/create/CreateStreamsPage.tsx'
import UpdateCategoryPage from './pages/update/UpdateCategoryPage.tsx'
import UpdateStreamingPage from './pages/update/UpdateStreamingPage.tsx'
import SearchActorsPage from './pages/search/SearchActorsPage.tsx'
import SearchMoviesPage from './pages/search/SearchMoviesPage.tsx'
import SearchStreamsPage from './pages/search/SearchStreamsPage.tsx'
import SearchCategoriesPage from './pages/search/SearchCategoriesPage.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>

      <Route path="/films" element={<FilmsPage />} />
      <Route path="/films/search" element={<SearchMoviesPage />} /> 
      <Route path="/films/create" element={<CreateFilmsPage />} />
      <Route path="/films/:id" element={<SpecificFilmPage />} />
      <Route path="/films/:id/update" element={<UpdateFilmPage />} />

      <Route path="/actors" element={<ActorsPage />} />
      <Route path="/actors/search" element={<SearchActorsPage />} />
      <Route path="/actors/create" element={<CreateActorsPage />} />
      <Route path="/actors/:id" element={<SpecificActorPage />} />
      <Route path="/actors/:id/update" element={<UpdateActorPage />} />

      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/search" element={<SearchCategoriesPage />} />
      <Route path="/categories/create" element={<CreateCategoriesPage />} />
      <Route path="/categories/:id" element={<SpecificCategoryPage />} />
      <Route path="/categories/:id/update" element={<UpdateCategoryPage />} />

      <Route path="/streams" element={<StreamsPage />} />
      <Route path="/streams/search" element={<SearchStreamsPage />} />
      <Route path="/streams/create" element={<CreateStreamsPage />} />
      <Route path="/streams/:id" element={<SpecificStreamingPage />} />
      <Route path="/streams/:id/update" element={<UpdateStreamingPage />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

