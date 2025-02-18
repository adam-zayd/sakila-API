
import {useState, useEffect} from "react";
import {Category} from "./PartialCategoryCard";
import { Link } from "react-router";
import "./AllDisplay.css";
import { baseUrl } from "../../config";

export default function AllCategories(){
    const [categories, setCategories]= useState<Category[]>([]);

    useEffect(() => {
        fetch(`${baseUrl}/categories`)
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    return (
        <div className= "container">
            <h1 className="pageTitle">All Categories</h1>
            <article className= "allCategories">
                {categories.map(category => (<li className="individuals" key= {category.id}>
                        <h3>
                            <Link className="name" to={`/categories/${category.id}`}>{category.name}</Link>
                        </h3>
                    </li>
                ))}
            </article>
        </div>
    );
}