import {Link} from 'react-router';

export default function Navbar(){
    return(
        <ul>
            <li><Link to= "/">Home</Link></li>
            <li><Link to= "/films">Movies</Link></li>
        </ul>
    );
}