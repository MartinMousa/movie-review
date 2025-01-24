# Filmix

This project is a modern movie discovery platform built with React and powered by TMDB API. It allows users to discover movies, manage their watchlist, write reviews, and interact with a community of movie enthusiasts.

## 🚀 Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Context API** - State management
- **Heroicons** - Icon library
- **React Query** - Data fetching and caching

### Backend & API
- **JSON Server** - Mock backend for development
- **TMDB API** - Movie data source
- **JWT** - Authentication
- **Axios** - HTTP client

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Git** - Version control

## ✨ Features

- **User Authentication**
  - Login and Registration
  - Profile management with avatar upload
  - Secure password handling

- **Movie Discovery**
  - Search movies with auto-suggestions
  - Filter by genre, rating, and release date
  - Sort by popularity, rating, and release date
  - Infinite scroll for movie listings

- **User Features**
  - Add movies to favorites
  - Manage watchlist
  - Write and edit reviews
  - Rate movies

- **UI/UX**
  - Responsive design
  - Dark/Light mode
  - Loading states and animations
  - Error handling
  - Toast notifications

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MartinMousa/movie-review.git
   cd movie-review
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_api_key
   VITE_TMDB_ACCESS_TOKEN=your_access_token
   ```

4. **Start the Development Server**
   ```bash
   # Start the frontend (Vite server)
   npm run dev

   # In a separate terminal, start the backend (JSON server)
   npm run server
   ```

5. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3001`

## 📦 Project Structure

```
movie-review/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/        # React Context providers
│   ├── pages/          # Page components
│   ├── services/       # API and utility services
│   ├── hooks/          # Custom React hooks
│   └── styles/         # Global styles and Tailwind config
├── server/
│   └── db.json         # JSON Server database
├── public/             # Static assets
└── package.json        # Project dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run server` - Start JSON Server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🌐 API Documentation

The application uses The Movie Database (TMDB) API for movie data. Key endpoints:

- `/discover/movie` - Get movie listings
- `/search/movie` - Search movies
- `/movie/{id}` - Get movie details
- `/movie/{id}/videos` - Get movie trailers
- `/movie/{id}/credits` - Get cast and crew

For local data (users, reviews, etc.), JSON Server endpoints:

- `/users` - User management
- `/profiles` - User profiles
- `/reviews` - Movie reviews
- `/favorites` - User favorites
- `/watchlist` - User watchlist

## 👥 Developers

- **Martin Mousa**
  - Role: Front-end Developer
  - GitHub: [MartinMousa](https://github.com/MartinMousa)

- **Abdelrahman Hecham**
  - Role: Front-end Developer
  - GitHub: [AbdelrahmanHecham](https://github.com/AbdelrahmanHecham)


## 🙏 Acknowledgments

- TMDB for providing the movie database API
- The React and Vite communities for excellent documentation
- All contributors who have helped improve this project
