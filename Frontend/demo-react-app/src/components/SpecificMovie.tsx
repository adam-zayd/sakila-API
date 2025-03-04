
import {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router";
import {Movie} from "./MovieCard";
import "./SpecificDisplay.css";
import {baseUrl} from "../../config.ts";
import { Edit } from "lucide-react"; 
import "./Buttons.css";

export default function SpecificMovie(){
    const {id}= useParams();
    const [movie, setMovie]= useState<Movie|null> (null);
    const [error, setError]= useState<Error|null> (null);
    const [loading, setLoading]= useState(true);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/films/${id}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(`ERROR: ${response.status}`);
        })
        .then(data => {
            setMovie(data);
            setTitle(data.title);
            setDescription(data.description);
            setCurrentTitle(data.title);
            setCurrentDescription(data.description);
        })
        .catch(setError)
        .finally(() => setLoading(false));
}, [id]);

const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
        const response = await fetch(`${baseUrl}/films?id=${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete movie");
        }

        alert("Movie deleted successfully!");
        navigate("/films");
    } catch (error: any) {
        alert(`Error: ${error.message}`);
    }
};

const handleEdit = () => {
    setEditMode(true);
};

const handleSave = async () => {
    if (title.length < 1 || title.length > 128 ) {
        alert("Title must be between 1 and 128 characters.");
        return;
    }
    try {
        const response = await fetch(`${baseUrl}/films/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                title: title, 
                description: description }),
        });

        if (!response.ok) {
            throw new Error("Failed to update movie");
        }

        setEditMode(false);
        alert("Movie updated successfully!");
        setCurrentTitle(title);
        setCurrentDescription(description);
    } catch (error: any) {
        alert(`Error: ${error.message}`);
    }
};

    const cancel = () => {
        setEditMode(false);
        setTitle(currentTitle);
        setDescription(currentDescription);
    };

    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>{error.message}</h1>
    }

    if(!movie){
        return <h1>Movie failed to load</h1>
    }

    return(
        <div className="container">
    {movie? (
        <>
            <h1 className="specificPageTitle">
                
            {editMode ? (
                            <textarea
                                value={title} 
                                onChange={(e) => setTitle(e.target.value.toUpperCase())}
                                maxLength={128} 
                                rows={2}
                                cols={50}
                            />
                        ) : (
                            <>
                                {title.toUpperCase()}
                                <Edit className= "editButton"
                                size={14}
                                    onClick={handleEdit} 
                                />
                            </>
                        )}
                
                </h1>
            <p className="movieDescription"><strong>
            {editMode ? (
                            <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={255} 
                            rows={10} 
                            cols={100}
                        />
                        ) : (
                            <>
                                {description}
                                <Edit className= "editButton"
                                    size={14}
                                    onClick={handleEdit} 
                                />
                            </>
                        )}
                </strong></p>

                {editMode && (
                        <div>
                        <button onClick={handleSave} className= "saveButton">
                            SAVE
                        </button>
                        <button onClick={cancel} className="cancelButton">
                                CANCEL
                            </button>
                        </div>
                    )}

            <p>Rating: {movie.rating}</p>
            <p>Language: {movie.language.name}</p>
            {(() => {
                if (movie.length === null){
                    return <p>Length: Unknown</p>;
                }
                return <p>Length: {Math.floor(movie.length/60)}h {movie.length%60}m</p>;
            })()}
            
            {(() => {
                if (movie.releaseYear === null){
                    return <p>Release Year: Unknown</p>;
                }
                const releaseYear = movie.releaseYear.slice(0, 4);
                return <p>Release Year: {releaseYear}</p>;
            })()}

            <p className="buttonTitles">Categories:</p>
            <article className="buttons">
                {movie.categories.length > 0 ? movie.categories.map(cat => (
                    <li className="attributeItem"><Link className= "attributeText" to={`/categories/${cat.categoryId}`}>{cat.name}</Link></li>
                )) : "Unknown"}
            </article>

            <p className="buttonTitles">Stream on:</p>
            <article className="buttons">
                {movie.streams.length > 0 ? movie.streams.map(stream => (
                <li className="attributeItem"><Link className= "attributeText" to={`/streams/${stream.serviceId}`}>{stream.name}</Link></li>
            )) : "Unknown"}
            </article>

            <p className="buttonTitles">Cast:</p>
            <article className="buttons">
                {movie.actors.length > 0 ? movie.actors.map(actor => (
                    <li className="attributeItem"><Link className= "attributeText" to={`/actors/${actor.actorId}`}>{actor.fullName}</Link></li>
                )) : "Unknown"}
            </article>

            <Link to={`/films/${id}/update`}>
                <button className= "editButton">
                    EDIT ALL
                </button>
            </Link>

            <button onClick={handleDelete} className="cancelButton">
                DELETE MOVIE
            </button>

        </>
    ) : (
        <p className="specificPageTitle">FILM NOT FOUND</p>
    )}
    
    <div className="backButton">
        <a href="/films">Back to Movies</a>
    </div>
</div>

    );
}