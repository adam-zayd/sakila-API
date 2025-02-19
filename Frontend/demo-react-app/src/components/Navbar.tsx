import {Link, useLocation} from 'react-router';
import "./Navbar.css";
export default function Navbar(){
    const location = useLocation();
    return(
        <ul className= "navbar">
            <li className={location.pathname === "/" ? "active" : ""}>
                {location.pathname === "/" ? <span className="navbarHome">Home</span> : <Link className="navbarHome" to="/">Home</Link>}
            </li>
            <li className={location.pathname === "/films" ? "active" : ""}>
                {location.pathname === "/films" ? <span className="navbarMovies">Movies</span> : <Link className="navbarMovies" to="/films">Movies</Link>}
            </li>
            <li className={location.pathname === "/actors" ? "active" : ""}>
                {location.pathname === "/actors" ? <span className="navbarActors">Actors</span> : <Link className="navbarActors" to="/actors">Actors</Link>}
            </li>
            <li className={location.pathname === "/categories" ? "active" : ""}>
                {location.pathname === "/categories" ? <span className="navbarCategories">Categories</span> : <Link className="navbarCategories" to="/categories">Categories</Link>}
            </li>
            <li className={location.pathname === "/streams" ? "active" : ""}>
                {location.pathname === "/streams" ? <span className="navbarStreams">Streaming Platforms</span> : <Link className="navbarStreams" to="/streams">Streaming Platforms</Link>}
            </li>
        </ul>
    );
}
