import { useState, useEffect } from "react";
import { Category } from "../entityCards/PartialCategoryCard";
import { Link } from "react-router";
import "../AllDisplay.scss";
import "../Search.css";
import { baseUrl } from "../../../config";

export default function SearchCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        if (query.length < 2) { 
            setCategories([]);
            return;
        }

        fetch(`${baseUrl}/categories?name=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(() => {
                setCategories([]);
            });
    }, [query]);

    return (
        <div className="container">
            <h1 className="pageTitle">SEARCH CATEGORIES</h1>

            <input
                type="text"
                className="searchInput"
                placeholder="Search categories by name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

        
                <ul className="searchResults">
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <li className="individuals" key={category.id}>
                                <h3>
                                    <Link className="name" to={`/categories/${category.id}`}>
                                        {category.name}
                                    </Link>
                                </h3>
                            </li>
                        ))
                    ) : (
                        query.length > 1 && <p className="noResults">No categories found.</p>
                    )}
                </ul>
           
        </div>
    );
}
