import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

function Autocompletar() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();
  const { store } = useGlobalReducer();

  const personajes = store.personajes || [];
  const planetas = store.planetas || [];
  const naves = store.naves || [];


  function handleChange(e) {
    const valor = e.target.value;
    setBusqueda(valor);
    if (valor.length === 0) {
      setResultados([]);
      return;
    }
    const lower = valor.toLowerCase();
    const lista = [
      ...personajes.map(p => ({ ...p, tipo: "personaje" })),
      ...planetas.map(p => ({ ...p, tipo: "planeta" })),
      ...naves.map(p => ({ ...p, tipo: "nave" }))
    ];
    setResultados(
      lista.filter(item => item.name.toLowerCase().includes(lower)).slice(0, 8)
    );
  }

  function irDetalle(item) {
    setBusqueda("");
    setResultados([]);
    navigate(`/detalle/${item.tipo}/${item.uid}`);
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar personaje, planeta o nave..."
        value={busqueda}
        onChange={handleChange}
        style={{ maxWidth: 350 }}
      />
      {resultados.length > 0 && (
        <ul className="list-group position-absolute w-100" style={{ zIndex: 10, maxHeight: 250, overflowY: "auto" }}>
          {resultados.map(item => (
            <li
              key={item.tipo + item.uid}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
              onClick={() => irDetalle(item)}
            >
              {item.name} <span className="badge bg-secondary ms-2">{item.tipo}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocompletar;
