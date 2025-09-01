import React, { useEffect, useState, useRef } from "react";
import "./Carousel.css";

const topAnimes = [
  {
    title: "Kaiju No. 8 Season 2",
    img: "https://cdn.myanimelist.net/images/anime/1715/142867l.jpg",
    date: "Jul 19, 2025",
    duration: "24m",
    tags: ["TV", "HD"],
    description: "After the destruction of their hometown, childhood friends Kafka Hibino and Mina Ashiro make a pact to protect Japan from colossal threats."
  },
  {
    title: "Solo Leveling Season 2",
    img: "https://cdn.myanimelist.net/images/anime/1764/142537l.jpg",
    date: "Oct 2025",
    duration: "24m",
    tags: ["TV", "HD"],
    description: "Jinwoo Sung returns stronger than ever as new gates open and deadlier enemies emerge."
  },
  {
    title: "One Piece",
    img: "https://cdn.myanimelist.net/images/anime/6/73245l.jpg",
    date: "Ongoing",
    duration: "24m",
    tags: ["TV", "HD"],
    description: "The legendary adventure of Monkey D. Luffy and his crew to become the Pirate King."
  },
  {
    title: "Jujutsu Kaisen Season 3",
    img: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
    date: "2025",
    duration: "24m",
    tags: ["TV", "HD"],
    description: "Yuji Itadori and friends face darker curses in the upcoming arc."
  },
  {
    title: "Attack on Titan: The Final Season",
    img: "https://cdn.myanimelist.net/images/anime/1000/110531l.jpg",
    date: "Completed",
    duration: "24m",
    tags: ["TV", "HD"],
    description: "The epic conclusion to humanity’s battle for survival against the Titans."
  }
];

export function Carousel() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const next = () => setIndex((prev) => (prev + 1) % topAnimes.length);
  const prev = () => setIndex((prev) => (prev - 1 + topAnimes.length) % topAnimes.length);

  useEffect(() => {
    timeoutRef.current = setTimeout(next, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <div className="hero-carousel">
      {topAnimes.map((anime, i) => (
        <div
          key={i}
          className={`hero-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${anime.img})` }}
        >
          <div className="overlay">
            <h2 className="hero-title">{anime.title}</h2>
            <div className="hero-meta">
              <span>📺 {anime.tags.join(" • ")}</span>
              <span>⏱ {anime.duration}</span>
              <span>📅 {anime.date}</span>
            </div>
            <p className="hero-desc">{anime.description}</p>
            <div className="hero-buttons">
              <button className="watch-btn">▶ Watch Now</button>
              <button className="detail-btn">Detail</button>
            </div>
          </div>
        </div>
      ))}

      <button className="nav prev" onClick={prev}>‹</button>
      <button className="nav next" onClick={next}>›</button>

      <div className="dots">
        {topAnimes.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "on" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;