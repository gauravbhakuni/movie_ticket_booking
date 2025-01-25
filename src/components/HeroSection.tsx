"use client";
import React, { useEffect, useState } from "react";
import { HeroParallax } from "./ui/hero-parallax";
import image from "../../public/chef boy.jpg";

export default function HeroSection() {
  const [movieList, setMovieList] = useState([]);

  const getMovies = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
      .then(res => res.json())
      .then(json => {
        const slicedMovies = json.results.slice(0, 10);
        setMovieList(slicedMovies);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movieList);

  const products = movieList.map((movie) => ({
    id: movie.id,
    title: movie.original_title,
    thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    language: movie.original_language,
    imgPath: movie.poster_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
  }));

  return <HeroParallax products={products} />;
}
