import React from "react";
import { useNavigate } from "react-router-dom";
import { Next } from "../assets";

interface GenreCardProps {
    name: string;
    image: string;
}

const GenreCard: React.FC<GenreCardProps> = ({ name, image }) => {
    const navigate = useNavigate();

    return (
        <div className="card flex justify-between items-center cursor-pointer bg-white" onClick={() => navigate(`/books/${name.toLowerCase()}`)} aria-label={`Navigate to ${name} books`}>
            <div className="genre-card flex items-center gap-2">
                <img src={image} alt={name} className="cardIcon" loading="lazy" />
                <span className="text-lg font-medium uppercase">{name}</span>
            </div>
            <img src={Next} alt="Next" className="cardIcon" loading="lazy" />
        </div>
    );
};

export default GenreCard;
