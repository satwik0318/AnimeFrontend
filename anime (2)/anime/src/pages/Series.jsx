import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import "../components/AnimePages.css"

const Series = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchSeriesAnime = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/anime/series?page=${page}`);
      const result = await response.json();
     
      if (result.success && result.data?.data) {
        setAnimeList(result.data.data);
        setCurrentPage(result.currentPage);
        setHasNextPage(result.hasNextPage);
      } else {
        setError('Failed to fetch series anime');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeriesAnime(1);
  }, []);

  const handlePageChange = (page) => {
    fetchSeriesAnime(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && currentPage === 1) {
    return <div className="loading">Loading series anime...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error: {error}</h2>
        <button onClick={() => fetchSeriesAnime(1)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="anime-page">
      <h1 className="page-title">Anime Series - Page {currentPage}</h1>
      
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

export default Series;
