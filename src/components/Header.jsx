import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-secondary shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold text-accent hover:text-accent-dark transition-colors">
            MovieReview
          </Link>
          <SearchBar />
          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <Link to="/favorites" className="hover:text-accent transition-colors">Favorites</Link>
            <Link to="/watchlist" className="hover:text-accent transition-colors">Watchlist</Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
