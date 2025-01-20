import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-secondary-dark/80 backdrop-blur-lg shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link 
            to="/" 
            className="text-2xl font-bold text-accent hover:text-opacity-80 transition-all duration-300 hover:scale-105"
          >
            MovieReview
          </Link>
          
          <div className="w-full md:w-auto max-w-md">
            <SearchBar />
          </div>

          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className="nav-link relative font-medium hover:text-accent transition-colors
                        after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0
                        after:bg-accent hover:after:w-full after:transition-all"
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className="nav-link relative font-medium hover:text-accent transition-colors
                        after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0
                        after:bg-accent hover:after:w-full after:transition-all"
            >
              Favorites
            </Link>
            <Link 
              to="/watchlist" 
              className="nav-link relative font-medium hover:text-accent transition-colors
                        after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0
                        after:bg-accent hover:after:w-full after:transition-all"
            >
              Watchlist
            </Link>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
