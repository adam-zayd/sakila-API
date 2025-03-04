import { Link } from "react-router";
import "./HomeDisplay.css";

export default function HomePage() {
    return (
        <div className="allContainer">
        <div className="homePage">
            <h1 className="pageTitle">Home Page</h1>
            <p>We have pages displaying all of the following:</p>
            <div className="categories-container">
                <div className="category-box">
                    <h3>
                        <Link to="/films/">Movies</Link>
                    </h3>
                </div>
                <div className="category-box">
                    <h3>
                        <Link to="/actors/">Actors</Link>
                    </h3>
                </div>
                <div className="category-box">
                    <h3>
                        <Link to="/categories/">Categories</Link>
                    </h3>
                </div>
                <div className="category-box">
                    <h3>
                        <Link to="/streams/">Streaming Platforms</Link>
                    </h3>
                </div>
            </div>
            <p>On the pages displaying all, you can: Create a new object, Select as many objects as you want to be deleted (and reset this if you change your mind), and even click on a specific object to open a new page with more details on the object and other functionality listed below.</p>
            <p>On the pages displaying a specific object, you can: Edit some of the object's details on-page, Delete the object, and even click on a link that will allow you to edit all of the object's details at once.</p>
            <p>Other features include: A navbar at the top of every page, to easily direct yourself to a desired page displaying all objects of a type, while not allowig you to click the link to the page you are currently on. A loading screen. Consistent page styling. Edit All pages pre-load with the previous details of the object. Objects in the details of another object can be clicked to directly link to their details. Errors while inputting information on the create and edit pages are mostly caught and the user is informed.</p>
        </div>
        </div>
    );
}
