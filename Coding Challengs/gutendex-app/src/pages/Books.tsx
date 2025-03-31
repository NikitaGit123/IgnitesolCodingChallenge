import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import "../styles/globals.css";
import * as GenreImages from "../assets";
import BookList from "../components/BookList";

const Books = () => {
    const { genre } = useParams<{ genre?: string }>();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

    const handleBack = () => navigate("/");
    const clearSearch = () => setSearchTerm("");

    useEffect(() => {
        if (searchTerm) {
            setSearchParams({ q: searchTerm });
        } else {
            setSearchParams({});
        }
    }, [searchTerm, setSearchParams]);

    return (
        <div className="flex flex-col items-center min-h-screen w-full overflow-x-hidden">
            <div className="bookHeading w-full bg-white p-4">
                <div className="bookheadingSection flex items-center gap-4 w-full">
                    <img
                        src={GenreImages.Back}
                        alt="Back"
                        className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
                        onClick={handleBack}
                        loading="lazy"
                    />

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary capitalize">
                        {genre || "Unknown Genre"}
                    </h1>
                </div>

                <div className="w-full flex
                 mt-4 ml-[10%]">
                    <div className="relative w-full sm:w-[75%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                        <img
                            src={GenreImages.Search}
                            alt="Search"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                        />

                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="searchBoxx w-full pl-10 pr-10 py-2 rounded-md focus:outline-none"
                        />

                        {searchTerm && (
                            <img
                                src={GenreImages.Cancel}
                                alt="Cancel"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
                                onClick={clearSearch}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full">
                <BookList genre={genre} searchTerm={searchTerm} />
            </div>
        </div>
    );
};

export default Books;
