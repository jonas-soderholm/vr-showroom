import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useSharedState } from "../SharedContext.js";

const API_KEY = "07b4e7818081deeb46a009a35c0d4535"; // Your TMDb API key

function MovieDetails() {
  const { movieId } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const { cartItems, setCartItems } = useSharedState();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then((response) => {
        setMovie({
          id: response.data.id,
          title: response.data.title,
          description: response.data.overview,
          cover_image: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
          release_date: response.data.release_date,
          price: "N/A",
        });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movieId]);

  function addToMyList(movie) {
    const newCartItems = [...cartItems, movie];
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center py-[8rem] text-sm mx-4 text-slate-200">
      <div className="w-[25rem] h-auto dark:bg-neutral-800 p-4 rounded-lg shadow-md flex flex-col justify-between">
        <div>
          <img src={movie.cover_image} alt={movie.title} className="mb-2 h-[10rem] mx-auto rounded-md" />
          <h3 className="text-xl font-semibold">{movie.title}</h3>
          <p className="">Release Date: {movie.release_date}</p>
          <p className="">{movie.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
