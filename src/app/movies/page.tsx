"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const MoviePage = ({ className }: { className?: string }) => {
  const [movieList, setMovieList] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const json = await response.json();
      setMovieList(json.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={`min-h-screen mt-24 bg-black text-white ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Now Playing...</h1>
        <div className="grid grid-cols-2 gap-6">
          {movieList.map((movie) => (
            <Link href={{
              pathname: `movies/${movie.id}`,
              query: {
                  id: movie.id,
                  title: movie.original_title,
                  language: movie.original_language,
                  imgPath: movie.poster_path,
                  vote_average: movie.vote_average,
                  overview: movie.overview,
              },
          }}>
              <div className="flex cursor-pointer transition-all duration-300 transform hover:scale-105">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-32 h-auto rounded-lg shadow-lg"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{movie.original_title}</h2>
                  <p className="text-sm"><span className="text-lime-300">Release Date:</span> {movie.release_date}</p>
                  <p className="text-sm"><span className="text-lime-300">Vote Average:</span> {movie.vote_average}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
