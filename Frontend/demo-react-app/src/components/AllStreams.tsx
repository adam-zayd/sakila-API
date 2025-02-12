
import {useState, useEffect} from "react";
import {Streaming} from "./StreamingCard";


export default function AllStreams(){
    const [streams, setStreams]= useState<Streaming[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/streams")
            .then(response => response.json())
            .then(data => setStreams(data));
    }, []);

    return (
        <div>
            <h3>All Streams</h3>
            <ul>
                {streams.map(streaming => (<li key= {streaming.id}>
                        <h2>{streaming.name}</h2>
                        <p>Website: {streaming.website}</p><p>Cost per month: {streaming.cost}</p>
                        <ul>Films available on platform: {streaming.films.length>0? streaming.films.map(film => <li>{film.title}</li>) : "Unknown"}</ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}