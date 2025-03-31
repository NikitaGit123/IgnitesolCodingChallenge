import React from "react";

interface BookCardProps {
  imageUrl: string;
  title: string;
  author: string;
  formats: { [key: string]: string };
}

const getBestBookLink = (formats: { [key: string]: string }): string => {
  return formats["text/html"] || formats["application/pdf"] || formats["text/plain"] || "";
};

const BookCard: React.FC<BookCardProps> = ({ imageUrl, title, author, formats }) => {
  const bookLink = getBestBookLink(formats);

  return (
    <div
      className={`flex flex-col cursor-pointer ${
        !bookLink ? "opacity-60 cursor-not-allowed" : ""
      }`}
      onClick={bookLink ? () => window.open(bookLink, "_blank", "noopener noreferrer") : undefined}
    >
      <div className="Rectangle">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full rounded-md object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-2">
        <h3 className="text-[12px] font-semibold font-montserrat w-[114px] truncate" title={title}>
          {title}
        </h3>
        <p className="text-[12px] font-normal font-montserrat text-gray-600 truncate" title={author}>
          {author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
