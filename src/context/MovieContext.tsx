// context/MovieContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from 'react';

interface MovieContextProps {
  movies: any[];
  loading: boolean;
}

const MovieContext = createContext<MovieContextProps>({
  movies: [],
  loading: true,
});

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await res.json();
      setMovies(data.results);
      setLoading(false);
      localStorage.setItem('movies', JSON.stringify(data.results));
      localStorage.setItem('moviesLoaded', 'true');
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const moviesLoaded = localStorage.getItem('moviesLoaded');
    if (moviesLoaded) {
      const storedMovies = localStorage.getItem('movies');
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      }
      setLoading(false);
    } else {
      getMovies();
    }
  }, []);

  return (
    <MovieContext.Provider value={{ movies, loading }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
