import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import TarjetaPersonaje from "../components/Personaje";
import TarjetaPlaneta from "../components/Planeta";
import TarjetaNave from "../components/Nave";

function Favoritos() {
  const { store } = useGlobalReducer();
  const favoritos = store.favoritos || [];

  if (favoritos.length === 0) {
    return <div className="container text-center text-light py-5">No hay favoritos guardados.</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="text-warning">Favoritos</h2>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {favoritos.map(fav => {
          if (fav.tipo === "personaje") {
            return (
              <Link key={fav.uid} to={`/detalle/personaje/${fav.uid}`} style={{textDecoration: 'none'}}>
                <TarjetaPersonaje nombre={fav.nombre} uid={fav.uid} />
              </Link>
            );
          } else if (fav.tipo === "planeta") {
            return (
              <Link key={fav.uid} to={`/detalle/planeta/${fav.uid}`} style={{textDecoration: 'none'}}>
                <TarjetaPlaneta nombre={fav.nombre} uid={fav.uid} />
              </Link>
            );
          } else if (fav.tipo === "nave") {
            return (
              <Link key={fav.uid} to={`/detalle/nave/${fav.uid}`} style={{textDecoration: 'none'}}>
                <TarjetaNave nombre={fav.nombre} uid={fav.uid} />
              </Link>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Favoritos;
