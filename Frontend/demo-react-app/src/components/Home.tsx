import "./AllDisplay.scss";

export default function HomePage() {
    return (
        <div className="homePage">
            <header className="homeHeader">
                <h1>Welcome to the Home Page</h1>
            </header>
            <main className="homeContent">
                <p>Welcome to our amazing site! Explore our features and enjoy your stay.</p>
                <button className="exploreButton">Explore Now</button>
            </main>
        </div>
    );
}