import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import "../components/AnimePages.css";

const Subbed = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  // ✅ backend URL from .env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchSubbedAnime = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/anime/subbed?page=${page}`);
      const result = response.data;

      if (result.success && result.data?.data) {
        setAnimeList(result.data.data);
        setCurrentPage(result.currentPage);
        setHasNextPage(result.hasNextPage);
      } else {
        setError("Failed to fetch subbed anime");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubbedAnime(1);
  }, []);

  const handlePageChange = (page) => {
    fetchSubbedAnime(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && currentPage === 1) {
    return <div className="loading">Loading subbed anime...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error: {error}</h2>
        <button onClick={() => fetchSubbedAnime(1)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="anime-page">
      <h1 className="page-title">Subbed Anime - Page {currentPage}</h1>

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

export default Subbed;
