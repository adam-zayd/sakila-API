import {useState, useEffect} from "react";
import {useParams} from "react-router";
import {Streaming} from "./StreamingCard";
import {baseUrl} from "../../config.ts";

export default function SpecificStreaming(){
    const {id} = useParams();
    const [streaming, setStreaming] = useState<Streaming|null> (null);
    const [error, setError] = useState<Error|null> (null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/streams/${id}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(`ERROR: ${response.status}`);
        })
        .then(setStreaming)
        .catch(setError)
        .finally(() => setLoading(false));
}, [id]);

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
        <div>
            {streaming?(
                <ul>
                    <h3>{streaming.name}</h3>
                    <p>Website: {streaming.website}</p><p>Cost per month: {streaming.cost}</p>
                    <p>Films available: {streaming.films.length>0? streaming.films.map(film => <li key={film.title}>{film.title}</li>) : "Unknown"}</p>
                </ul>
            ) : (
                <p>STREAM NOT FOUND</p>
            )}
        </div>
    );
}