import {useState, useEffect} from "react";
import {useParams,useNavigate,Link} from "react-router";
import {Streaming} from "./StreamingCard";
import {baseUrl} from "../../config.ts";
import "./Buttons.css";
import "./SpecificDisplay.css";
import { Edit } from "lucide-react";

export default function SpecificStreaming(){
    const {id} = useParams();
    const [streaming, setStreaming] = useState<Streaming|null> (null);
    const [error, setError] = useState<Error|null> (null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [currentName, setCurrentName] = useState("");
    const [website, setWebsite] = useState("");
    const [currentWebsite, setCurrentWebsite] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/streams/${id}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(`ERROR: ${response.status}`);
        })
        .then(data => {
            setStreaming(data);
            setName(data.name);
            setCurrentName(data.name);
            setWebsite(data.website);
            setCurrentWebsite(data.website);
        })
        .catch(setError)
        .finally(() => setLoading(false));
}, [id]);

const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this Streaming Platform?")) return;

    try {
        const response = await fetch(`${baseUrl}/streams?id=${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete Streaming Platform");
        }

        alert("Streaming Platform deleted successfully!");
        navigate("/streams");
    } catch (error: any) {
        alert(`Error: ${error.message}`);
    }
};

const handleEdit = () => {
    setEditMode(true);
};

const handleSave = async () => {
    if (name.length < 1 || name.length > 45) {
        alert("Name must be between 1 and 45 characters.");
        return;
    }
    if (website.length<1 || website.length > 255) {
        alert("Website must be between 1 and 255 characters.");
        return;
    }
    try {
        const response = await fetch(`${baseUrl}/streams/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name,
                website
             }),
        });

        if (!response.ok) {
            throw new Error("Failed to update Streaming Platform");
        }

        setEditMode(false);
        alert("Streaming Platform updated successfully!");
        setCurrentName(name);
    } catch (error: any) {
        alert(`Error: ${error.message}`);
    }
};

const cancel = () => {
    setEditMode(false);
    setName(currentName);
    setWebsite(currentWebsite);
};

    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>{error.message}</h1>
    }

    if(!streaming){
        return <h1>Streaming failed to load</h1>
    }

    return(
        <div className="container">
            {streaming?(
                <ul>
                    <h3 className="specificPageTitle">
                            {editMode ? (
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={25} 
                                />
                            ) : (
                                <>
                                    {name}
                                    <Edit className= "editButton"
                                    size={14}
                                        onClick={handleEdit} 
                                    />
                                </>
                            )}
                        </h3>

                        <p>
                            {editMode ? (
                                <input 
                                    type="text" 
                                    value={website} 
                                    onChange={(e) => setWebsite(e.target.value)}
                                    maxLength={25} 
                                />
                            ) : (
                                <>
                                    {website}
                                    <Edit className= "editButton"
                                    size={14}
                                        onClick={handleEdit} 
                                    />
                                </>
                            )}
                        </p>

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

                    <p>Cost per month: {streaming.cost} GBP</p>

                    <p className="buttonTitles">Films:</p>
    
                        <article className="buttons">
                            {streaming.films.length > 0 ? streaming.films.map(movie => (
                                <li className="attributeItem"><Link className= "attributeText" to={`/films/${movie.filmId}`}>{movie.title}</Link></li>
                            )) : "Unknown"}
                        </article>
                        
                        <Link to={`/streams/${id}/update`}>
                            <button className= "editButton">
                                EDIT ALL
                            </button>
                        </Link>
    
                        <button onClick={handleDelete} className="cancelButton">
                            DELETE STREAMING PLATFORM
                        </button>
    
                        <div className="backButton">
                            <a href="/streams">Back to Streaming Platforms</a>
                        </div>
                </ul>
            ) : (
                <p>STREAM NOT FOUND</p>
            )}
        </div>
    );
}