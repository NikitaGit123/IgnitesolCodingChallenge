import React from "react";
import "../styles/globals.css";
import * as GenreImages from "../assets";
import GenreCard from "../components/GenreCard";

const genres = [
    { name: "Fiction", image: GenreImages.FictionImg },
    { name: "Drama", image: GenreImages.DramaImg },
    { name: "Humor", image: GenreImages.HumorImg },
    { name: "Politics", image: GenreImages.PoliticsImg },
    { name: "Philosophy", image: GenreImages.PhilosophyImg },
    { name: "History", image: GenreImages.HistoryImg },
    { name: "Adventure", image: GenreImages.AdventureImg }
];

const Home = () => {
    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            <div className="CardHeading">
                <div className="headingSection">
                    <h1 className="text-4xl font-bold text-primary">GUTENBERG PROJECT</h1>
                    <p className="text-gray-600 text-lg mt-2">
                        A social cataloging website that allows you to freely search its database of books, annotations,<br /> and reviews.
                    </p>
                </div>
            </div>

            <div className="generCard w-full flex flex-col md:flex-row">
                <div className="cardColumn w-full md:w-1/2 md:pr-2">
                    {genres.slice(0, 4).map(({ name, image }) => (
                        <GenreCard key={name} name={name} image={image} />
                    ))}
                </div>

                <div className="cardColumn w-full md:w-1/2 md:pl-2">
                    {genres.slice(4).map(({ name, image }) => (
                        <GenreCard key={name} name={name} image={image} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
