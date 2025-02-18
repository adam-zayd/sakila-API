
import {useState, useEffect} from "react";
import {Streaming} from "./PartialStreamingCard";
import { Link } from "react-router";
import "./AllDisplay.scss";
import { baseUrl } from "../../config";

export default function AllStreams(){
    const [streams, setStreams]= useState<Streaming[]>([]);

    useEffect(() => {
        fetch(`${baseUrl}/streams`)
            .then(response => response.json())
            .then(data => setStreams(data));
    }, []);

    return (
        <div>
            <h1 className="pageTitle">All Streams</h1>

            <button className="createButton">
                <Link to="/streams/create">CREATE STREAM</Link>
            </button>

            <article className= "allStreams">
                {streams.map(streaming => (<li className="individuals" key= {streaming.id}>
                        <h3>
                            <Link className="name" to={`/streams/${streaming.id}`}>{streaming.name}</Link>
                        </h3>
                    </li>
                ))}
            </article>
        </div>
    );
}