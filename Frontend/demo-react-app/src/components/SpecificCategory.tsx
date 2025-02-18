import {useState, useEffect} from "react";
import { useParams } from "react-router";
import {Category} from "./CategoryCard";
import {baseUrl} from "../../config.ts";

export default function SpecificCategory(){
    const {id} = useParams();
    const [category, setCategory] = useState<Category|null> (null);
    const [error, setError] = useState<Error|null> (null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/categories/${id}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(`ERROR: ${response.status}`);
        })
        .then(setCategory)
        .catch(setError)
        .finally(() => setLoading(false));
}, [id]);

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
        <div>
            {category?(
                <ul>
                    <h3>{category.name}</h3>
                    <p>Films: {category.films.length>0? category.films.map(film => <li key={film.title}>{film.title}</li>) : "Unknown"}</p>
                </ul>
            ) : (
                <p>CATEGORY NOT FOUND</p>
            )}
        </div>
    );
}