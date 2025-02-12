
import {useState, useEffect} from "react";
import {Category} from "./PartialCategoryCard";


export default function AllCategories(){
    const [categories, setCategories]= useState<Category[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/categories")
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    return (
        <div>
            <h3>All Categories</h3>
            <ul>
                {categories.map(category => (<li key= {category.id}>
                        <h2>{category.name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}