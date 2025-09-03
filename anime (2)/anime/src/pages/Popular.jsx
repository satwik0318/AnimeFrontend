import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import "../components/AnimePages.css";

const Popular = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  // ✅ backend URL from .env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchPopularAnime = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/anime/popular?page=${page}`);
      const result = response.data;

      if (result.success && result.data?.data) {
        setAnimeList(result.data.data);
        setCurrentPage(result.currentPage);
        setHasNextPage(result.hasNextPage);
      } else {
        setError("Failed to fetch popular anime");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularAnime(1);
  }, []);

  const handlePageChange = (page) => {
    fetchPopularAnime(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && currentPage === 1) {
    return <div className="loading">Loading popular anime...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error: {error}</h2>
        <button onClick={() => fetchPopularAnime(1)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="anime-page">
      <h1 className="page-title">Popular Anime - Page {currentPage}</h1>

      {loading && <div className="loading-overlay">Loading...</div>}

      <div className="anime-grid">
        {animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default Popular;
