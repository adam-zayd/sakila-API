import { useState, useEffect } from "react";
import { Category } from "./PartialCategoryCard";
import { Link } from "react-router";
import "./AllDisplay.scss";
import { baseUrl } from "../../config";

export default function AllCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());


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

    const toggleSelection = (categoryId: number) => {
        setSelectedCategories(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(categoryId)) {
                newSelected.delete(categoryId); 
            } else {
                newSelected.add(categoryId);
            }
            return newSelected;
        });
    };

    const deleteSelectedCategories = () => {
        if (window.confirm("Are you sure you want to delete the selected categories?")) {
            const deleteRequests = Array.from(selectedCategories).map(categoryId => 
                fetch(`${baseUrl}/categories?id=${categoryId}`, {
                    method: "DELETE"
                })
            );
    
            Promise.all(deleteRequests)
                .then(responses => {
                    if (responses.some(response => !response.ok)) {
                        throw new Error("Failed to delete some categories");
                    }
                    return responses;
                })
                .then(() => {
                    setCategories(prevCategories => prevCategories.filter(category => !selectedCategories.has(category.id)));
                    setSelectedCategories(new Set());
                    alert("Selected categories have been deleted.");
                })
                .catch(error => {
                    console.error("Error deleting categories:", error);
                    alert("An error occurred while deleting categories.");
                });
        }
    };

    const resetSelectedCategories = () => {
        if (window.confirm("Are you sure you want to deselect all categories?")) {
        setSelectedCategories(new Set());
        }
    };

    return (
        <div className="allContainer">
            <h1 className="pageTitle">All Categories</h1>
            <div className="fullPageContainer">
                <button className="createButton">
                    <Link className="createLink" to="/categories/create">CREATE CATEGORIES</Link>
                </button>
            </div>

            {selectedCategories.size > 0 && (
                <>
                <div className="fixedButtonsContainer">
                        <button className="deleteButton" onClick={deleteSelectedCategories}>
                            Delete All Selected
                        </button>
                        <button className="resetButton" onClick={resetSelectedCategories}>
                            Reset Selected
                        </button>
                    </div>
                </>
            )}

            {loading ? ( 
                <div className="loading">
                    <img 
                        className="spinner"
                        src="src\assets\Designer.jpeg" 
                        alt="Loading Icon" 
                        style={{ width: '200px', height: '200px', marginTop: '60px', marginLeft: '665px' }} 
                    />
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
                            <input
                                type="checkbox"
                                checked={selectedCategories.has(category.id)}
                                onChange={() => toggleSelection(category.id)}
                            />
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
