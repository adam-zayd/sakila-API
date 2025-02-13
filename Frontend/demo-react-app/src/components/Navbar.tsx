import {Link} from 'react-router';

export default function Navbar(){
    return(
        <ul>
            <li><Link to= "/">Home</Link></li>
            <li><Link to= "/films">Movies</Link></li>
            <li><Link to= "/actors">Actors</Link></li>
            <li><Link to= "/categories">Categories</Link></li>
            <li><Link to= "/streams">Streaming Platforms</Link></li>
        </ul>
    );
}