import { Link } from "react-router-dom";

export const Navbar = () => {
       return (
	       <nav className="navbar navbar-expand-lg" style={{background: '#22223b'}}>
		       <div className="container">
			       <Link to="/">
				       <span className="navbar-brand mb-0 h1 text-warning">Star Wars Blog</span>
			       </Link>
			       <div className="ml-auto d-flex align-items-center gap-2">
				       <Link to="/favoritos">
					       <button className="btn btn-warning">Favoritos</button>
				       </Link>
			       </div>
		       </div>
	       </nav>
       );
};