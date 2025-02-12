
import {useState, useEffect} from "react";
import {Category} from "./CategoryCard";


export default function SpecificCategory(){
    const [category, setCategory]= useState<Category|null>(null);

    useEffect(() => {
        const id: number = 0;
        fetch(`http://localhost:8080/categories/${id}`)
        .then(response => {
            if (response.ok){
            return response.json();
            }
            throw new Error("Category not found");
        })
        .then(data => setCategory(data))
        .catch(_error => setCategory(null));
}, []);

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