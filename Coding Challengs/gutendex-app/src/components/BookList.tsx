import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "./BookCard";

interface Book {
  id: number;
  title: string;
  subjects: string[];
  formats: { [key: string]: string };
  authors: { name: string; birth_year?: number; death_year?: number }[];
}

interface BookListProps {
  genre?: string;
  searchTerm?: string;
}

const BookList: React.FC<BookListProps> = ({ genre, searchTerm = "" }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [visibleBooks, setVisibleBooks] = useState<Book[]>([]);

  const fetchBooks = async (pageNumber: number, isNewSearch = false) => {
    if (!genre) return;
    setLoading(true);
    setError(null);
    
    //We can add .env file to hide the URL
    // const baseUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(
        `http://skunkworks.ignitesol.com:8000/books?topic=${encodeURIComponent(
          genre
        )}&search=${encodeURIComponent(searchTerm)}&mime_type=image/jpeg&page=${pageNumber}`
      );

      if (!response.ok) throw new Error("Failed to fetch books");

      const data = await response.json();
      const newBooks = data.results;

      if (isNewSearch) {
        setBooks(newBooks);
        setVisibleBooks(newBooks.slice(0, getColumnsCount() * 3));
      } else {
        setBooks((prev) => [...prev, ...newBooks]);
        setVisibleBooks((prev) => [...prev, ...newBooks]);
      }

      setHasMore(!!data.next);
    } catch (error) {
      setError("Error fetching books. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchBooks(1, true);
  }, [genre, searchTerm]);

  const fetchMoreBooks = () => {
    if (!hasMore) return;
    setPage((prevPage) => prevPage + 1);
    fetchBooks(page + 1);
  };

  const getColumnsCount = () => {
    if (window.innerWidth >= 1280) return 6; // xl:grid-cols-6
    if (window.innerWidth >= 1024) return 4; // lg:grid-cols-4
    if (window.innerWidth >= 768) return 3; // md:grid-cols-3
    return 2; // default sm:grid-cols-2
  };

  const [columns, setColumns] = useState(getColumnsCount());

  useEffect(() => {
    const handleResize = () => setColumns(getColumnsCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="BookList px-4">
      {loading && books.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">No books found for this category.</p>
      ) : (
        <InfiniteScroll
          dataLength={visibleBooks.length}
          next={fetchMoreBooks}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center my-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
            </div>
          }
          endMessage={<p className="text-center text-gray-500">Yay! You have seen it all.</p>}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {visibleBooks.map((book) => (
              <BookCard
                key={book.id}
                imageUrl={book.formats["image/jpeg"]}
                title={book.title}
                author={book.authors?.[0]?.name || "Unknown Author"}
                formats={book.formats}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default BookList;
