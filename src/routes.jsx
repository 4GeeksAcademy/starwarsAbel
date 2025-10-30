

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import Leermas from "./pages/Leermas";
import { Demo } from "./pages/Demo";
import Favoritos from "./pages/Favoritos";

export const router = createBrowserRouter(
    createRoutesFromElements(
   
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
  <Route path="/single/:theId" element={ <Single />} />
  <Route path="/detalle/:tipo/:uid" element={<Leermas />} />
  <Route path="/demo" element={<Demo />} />
  <Route path="/favoritos" element={<Favoritos />} />
      </Route>
    )
);