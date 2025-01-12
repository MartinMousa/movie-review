import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import SearchResults from './pages/SearchResults'
import Favorites from './pages/Favorites'
import Watchlist from './pages/Watchlist'
import { MovieProvider } from './context/MovieContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  // Initialize dark mode based on system preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <ThemeProvider>
      <MovieProvider>
        <Router>
          <div className="min-h-screen bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark flex flex-col transition-colors">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  )
}

export default App
