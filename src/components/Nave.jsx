
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

function TarjetaNave({ nombre, uid }) {
  const urlImg = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/${uid}.jpg`;
  const placeholder = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg";
  const [imgSrc, setImgSrc] = useState(urlImg);
  const { dispatch, store } = useGlobalReducer();
  const esFavorito = (store.favoritos || []).some(fav => fav.uid === uid && fav.tipo === "nave");
  const [info, setInfo] = useState(null);

  useEffect(() => {
  fetch(`https://www.swapi.tech/api/starships/${uid}`)
      .then(res => res.json())
      .then(data => setInfo(data.result?.properties));
  }, [uid]);

  function guardarFavorito(e) {
    e.preventDefault();
    dispatch({
      type: esFavorito ? 'eliminar_favorito' : 'agregar_favorito',
      payload: { tipo: "nave", uid, nombre }
    });
  }

  return (
    <div className="card m-2" style={{ width: "16rem", background: "#22223b", color: "#f2e9e4", position: 'relative' }}>
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
            <li><b>Modelo:</b> {info.model}</li>
            <li><b>Clase:</b> {info.starship_class}</li>
            <li><b>Pasajeros:</b> {info.passengers}</li>
          </ul>
        )}
        <div className="d-flex gap-2">
          <button className={`btn btn-sm ${esFavorito ? 'btn-danger' : 'btn-outline-warning'}`} onClick={guardarFavorito}>
            {esFavorito ? 'Quitar' : 'Favorito'}
          </button>
          <Link to={`/detalle/nave/${uid}`} className="btn btn-sm btn-info text-light">Saber más</Link>
        </div>
      </div>
    </div>
  );
}

export default TarjetaNave;
