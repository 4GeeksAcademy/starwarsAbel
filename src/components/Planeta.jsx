
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

function TarjetaPlaneta({ nombre, uid }) {
  const urlImg = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${uid}.jpg`;
  const placeholder = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg";
  const [imgSrc, setImgSrc] = useState(urlImg);
  const { dispatch, store } = useGlobalReducer();
  const esFavorito = (store.favoritos || []).some(fav => fav.uid === uid && fav.tipo === "planeta");
  const [info, setInfo] = useState(null);

  useEffect(() => {
  fetch(`https://www.swapi.tech/api/planets/${uid}`)
      .then(res => res.json())
      .then(data => setInfo(data.result?.properties));
  }, [uid]);

  function guardarFavorito(e) {
    e.preventDefault();
    dispatch({
      type: esFavorito ? 'eliminar_favorito' : 'agregar_favorito',
      payload: { tipo: "planeta", uid, nombre }
    });
  }

  return (
    <div className="card m-2" style={{ width: "16rem", background: "#003049", color: "#fdf0d5", position: 'relative' }}>
      <img
        src={imgSrc}
        onError={() => setImgSrc(placeholder)}
        className="card-img-top"
        alt={nombre}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        {info && (
          <ul className="list-unstyled mb-2">
            <li><b>Clima:</b> {info.climate}</li>
            <li><b>Población:</b> {info.population}</li>
            <li><b>Terreno:</b> {info.terrain}</li>
          </ul>
        )}
        <div className="d-flex gap-2">
          <button className={`btn btn-sm ${esFavorito ? 'btn-danger' : 'btn-outline-warning'}`} onClick={guardarFavorito}>
            {esFavorito ? 'Quitar' : 'Favorito'}
          </button>
          <Link to={`/detalle/planeta/${uid}`} className="btn btn-sm btn-info text-light">Saber más</Link>
        </div>
      </div>
    </div>
  );
}

export default TarjetaPlaneta;
