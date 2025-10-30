import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

function Leermas() {
    const { tipo, uid } = useParams();
    const [info, setInfo] = useState(null);
    const [imgSrc, setImgSrc] = useState("");
    const location = useLocation();

    useEffect(() => {
        let urlApi = "";
        let urlImg = "";
        if (tipo === "personaje") {
            urlApi = `https://www.swapi.tech/api/people/${uid}`;
            urlImg = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${uid}.jpg`;
        } else if (tipo === "planeta") {
            urlApi = `https://www.swapi.tech/api/planets/${uid}`;
            urlImg = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${uid}.jpg`;
        } else if (tipo === "nave") {
            urlApi = `https://www.swapi.tech/api/starships/${uid}`;
            urlImg = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/${uid}.jpg`;
        }
        fetch(urlApi)
            .then(res => res.json())
            .then(data => {
                setInfo(data.result.properties);
                setImgSrc(urlImg);
            });
    }, [tipo, uid]);

    if (!info) return <div>Cargando...</div>;

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-secondary mb-3">Volver</Link>
            <div className="row">
                <div className="col-md-4">
                    <img src={imgSrc} alt={info.name} className="img-fluid rounded" style={{ width: "100%", maxHeight: 350, objectFit: "cover" }} onError={e => e.target.style.display = 'none'} />
                </div>
                <div className="col-md-8">
                    <h2>{info.name}</h2>
                    <ul className="list-group list-group-flush">
                        {Object.entries(info).map(([key, value]) => (
                            <li key={key} className="list-group-item" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                                <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Leermas;
