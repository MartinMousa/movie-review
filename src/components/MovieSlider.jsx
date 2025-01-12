import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';

export default function MovieSlider() {
  const { popularMovies } = useMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const visibleMovies = popularMovies.slice(currentIndex, currentIndex + 5);

  const handleTransition = (newIndex) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const nextSlide = () => {
    const newIndex = currentIndex + 1 >= popularMovies.length - 4 ? 0 : currentIndex + 1;
    handleTransition(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex - 1 < 0 ? popularMovies.length - 5 : currentIndex - 1;
    handleTransition(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (!popularMovies.length) return null;

  return (
    <div className="relative bg-secondary-light dark:bg-secondary-dark rounded-lg p-3 mb-4">
      <h2 className="text-lg font-bold mb-2">Most Popular</h2>
      
      <div className="relative">
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 disabled:opacity-50"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="relative overflow-hidden">
          <div 
            className={`flex gap-2 transition-transform duration-300 ease-out ${isTransitioning ? 'pointer-events-none' : ''}`}
            style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
          >
            {popularMovies.map(movie => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="flex-none w-1/5 transition-transform hover:scale-105"
                style={{ minWidth: '20%' }}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1.5">
                    <h3 className="text-white text-xs font-medium truncate">{movie.title}</h3>
                    <p className="text-gray-300 text-[10px]">
                      Rating: {movie.rating.toFixed(1)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 disabled:opacity-50"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
