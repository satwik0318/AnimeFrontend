import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "../components/Carousel";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import "./Home.css";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  // ✅ backend URL from .env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchHomeData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/anime/home?page=${page}`);
      const result = response.data;

      if (result.success && result.data?.data) {
        const animeData = result.data.data;

        if (page === 1) {
          const formattedSlides = animeData.slice(0, 5).map((anime) => ({
            src: anime.entry?.images?.jpg?.large_image_url || anime.entry?.images?.jpg?.image_url,
            alt: anime.entry?.title || "Anime",
            title: anime.entry?.title,
          }));
          setSlides(formattedSlides);
        }

        setAnimeList(animeData);
        setCurrentPage(result.currentPage);
        setHasNextPage(result.hasNextPage);
      } else {
        setError("Failed to fetch home data");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Error fetching home data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData(1);
  }, []);

  const handlePageChange = (page) => {
    fetchHomeData(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && currentPage === 1) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
        <p>Loading popular episodes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => fetchHomeData(1)} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      {currentPage === 1 && (
        <section className="hero-section">
          <h1 className="section-title">Trending Now</h1>
          {slides.length > 0 && <Carousel data={slides} />}
        </section>
      )}

      <section className="popular-episodes">
        <h2 className="section-title">Popular Episodes - Page {currentPage}</h2>

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}

        <div className="anime-grid">
          {animeList.map((anime, index) => (
            <AnimeCard key={`${anime.entry?.mal_id}-${index}`} anime={anime.entry} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </section>
    </div>
  );
};

export default Home;
