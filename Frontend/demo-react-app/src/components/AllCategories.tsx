import { useState, useEffect } from "react";
import { Category } from "./PartialCategoryCard";
import { Link } from "react-router";
import "./AllDisplay.scss";
import { baseUrl } from "../../config";

export default function AllCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${baseUrl}/categories`)
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(() => {
                setCategories([]);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <h1 className="pageTitle">All Categories</h1>

            <button className="createButton">
                <Link className="createCategoryLink" to="/categories/create">CREATE CATEGORIES</Link>
            </button>

            {loading ? (<div className="loading">
                <div className="loading-text">
                    <span className="loading-text-words">L</span>
                    <span className="loading-text-words">O</span>
                    <span className="loading-text-words">A</span>
                    <span className="loading-text-words">D</span>
                    <span className="loading-text-words">I</span>
                    <span className="loading-text-words">N</span>
                    <span className="loading-text-words">G</span>
                </div>
            </div>
            ) : (
                <article className="allCategories">
                    {categories.map(category => (
                        <li className="individuals" key={category.id}>
                            <h3>
                                <Link className="name" to={`/categories/${category.id}`}>
                                    {category.name}
                                </Link>
                            </h3>
                        </li>
                    ))}
                </article>
            )}
        </div>
    );
}
