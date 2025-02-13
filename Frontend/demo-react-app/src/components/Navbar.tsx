import {Link} from 'react-router';
import "./navbar.css";
export default function Navbar(){
    return(
        <ul className= "navbar">
            <li><Link to= "/">Home</Link></li>
            <li><Link to= "/films">Movies</Link></li>
            <li><Link to= "/actors">Actors</Link></li>
            <li><Link to= "/categories">Categories</Link></li>
            <li><Link to= "/streams">Streaming Platforms</Link></li>
        </ul>
    );
}