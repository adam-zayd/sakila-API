
import {useState, useEffect} from "react";
import {Streaming} from "./StreamingCard";


export default function SpecificStreaming(){
    const [streaming, setStreaming]= useState<Streaming|null>(null);

    useEffect(() => {
        const id: number = 1;
        fetch(`http://localhost:8080/streams/${id}`)
        .then(response => {
            if (response.ok){
            return response.json();
            }
            throw new Error("Stream not found");
        })
        .then(data => setStreaming(data))
        .catch(_error => setStreaming(null));
}, []);

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