import {useState, useEffect} from "react";
import { useParams } from "react-router";
import {Category} from "./CategoryCard";
import {baseUrl} from "../../config.ts";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import "./Buttons.css";
import "./SpecificDisplay.css";
import { Edit } from "lucide-react";

export default function SpecificCategory(){
    const {id} = useParams();
    const [editMode, setEditMode] = useState(false);
    const [category, setCategory] = useState<Category|null> (null);
    const [error, setError] = useState<Error|null> (null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [currentName, setCurrentName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/categories/${id}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(`ERROR: ${response.status}`);
        })
        .then(data => {
            setCategory(data);
            setName(data.name);
            setCurrentName(data.name);
        })
        .catch(setError)
        .finally(() => setLoading(false));
}, [id]);

const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
        const response = await fetch(`${baseUrl}/categories?id=${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete category");
        }

        alert("Category deleted successfully!");
        navigate("/categories");
    } catch (error: any) {
        alert(`Error: ${error.message}`);
    }
};

const handleEdit = () => {
    setEditMode(true);
};

const handleSave = async () => {
    if (name.length < 1 || name.length > 25) {
        alert("Name must be between 1 and 25 characters.");
        return;
    }
    try {
        const response = await fetch(`${baseUrl}/categories/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error("Failed to update Category");
        }

        setEditMode(false);
        alert("Category updated successfully!");
        setCurrentName(name);
    } catch (error: any) {
        alert(`Error: ${error.message}`);
    }
};

const cancel = () => {
    setEditMode(false);
    setName(currentName);
};


    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>{error.message}</h1>
    }

    if(!category){
        return <h1>Category failed to load</h1>
    }

    return(
        <div className="container">
            {category?(
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
    
                        <p className="buttonTitles">Films:</p>
    
                        <article className="buttons">
                            {category.films.length > 0 ? category.films.map(movie => (
                                <li className="attributeItem"><Link className= "attributeText" to={`/films/${movie.filmId}`}>{movie.title}</Link></li>
                            )) : "Unknown"}
                        </article>
                        
                        <Link to={`/categories/${id}/update`}>
                            <button className= "editButton">
                                EDIT ALL
                            </button>
                        </Link>
    
                        <button onClick={handleDelete} className="cancelButton">
                            DELETE CATEGORY
                        </button>
    
                        <div className="backButton">
                            <a href="/categories">Back to Categories</a>
                        </div>
                    </ul>
            ) : (
                <p>CATEGORY NOT FOUND</p>
            )}
        </div>
    );
}