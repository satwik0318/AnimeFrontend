import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import "../components/AnimePages.css";

const Dubbed = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchDubbedAnime = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/anime/dubbed?page=${page}`);
      const result = await response.json();
     
      if (result.success && result.data?.data) {
        setAnimeList(result.data.data);
        setCurrentPage(result.currentPage);
        setHasNextPage(result.hasNextPage);
      } else {
        setError('Failed to fetch dubbed anime');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDubbedAnime(1);
  }, []);

  const handlePageChange = (page) => {
    fetchDubbedAnime(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && currentPage === 1) {
    return <div className="loading">Loading dubbed anime...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error: {error}</h2>
        <button onClick={() => fetchDubbedAnime(1)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="anime-page">
      <h1 className="page-title">Dubbed Anime - Page {currentPage}</h1>
      
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

export default Dubbed;