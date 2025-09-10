import { useState, useEffect } from 'react';
import "./ExternalMovies.css";

export default function ExternalMovies({ page = 4 }) {
  const [films, setFilms] = useState([]);
  const [idx, setIdx] = useState(0);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    fetch(`/api/films?page=${page}`)
      .then(r => r.json())
      .then(data => setFilms(data.results))
      .catch(err => console.error(err));
  }, [page]);

  if (films.length === 0) return <p>Chargement…</p>;

  const film = films[idx];
  const next = () => setIdx((idx + 1) % films.length);
  const onLike = () => {
    setLiked([...liked, film.title]);
    next();
  };

  return (
    <div>
      <div className="card-container">
        <div className="card">
          <img src={film.poster} alt={film.title} />
          <h2>{film.title}</h2>
          <p><em>{film.genre}</em></p>
          <div className="actions">
            <button className="btn skip" onClick={next}>👎 Passer</button>
            <button className="btn like" onClick={onLike}>👍 J’aime</button>
          </div>
          <p>Film {idx+1}/{films.length}</p>
        </div>
      </div>

      <hr/>

      <h2>Films aimés :</h2>
      <ul>
        {liked.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}
