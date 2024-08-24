import React, { useState } from 'react';
import { FaRegComment, FaRegHeart, FaRegBookmark } from 'react-icons/fa';

const NewsCard = (props) => {
    const {article}= props;
    let [error, setError] = useState(false);

    const handleCardClick = () => {
        window.open(article.url, '_blank');
    };

    const handleButtonClick = (e) => {
        e.stopPropagation(); // Prevent triggering the card click event
        window.open(article.url, '_blank');
    };

    return (!error ?
        <div
            className="bg-gray-800 text-white p-4 rounded-lg shadow-lg relative cursor-pointer group"
            onClick={handleCardClick}
        >
            <button
                onClick={handleButtonClick}
                className="absolute top-2 right-2 bg-blue-500 text-white p-1 pr-3 pl-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700"
            >
                Read Article
            </button>

            <div className="flex items-center space-x-2 mb-2">
                <div className="bg-purple-500 p-2 rounded-full">
                    <FaRegBookmark className="text-white"/>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>

            <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-gray-700 text-xs px-2 py-1 rounded">{article.author}</span>
            </div>

            <p className="text-gray-400 text-sm mb-4">{article.publishedAt}</p>

            <img
                src={article.urlToImage || 'https://via.placeholder.com/100'}
                alt="Article"
                className="w-full h-auto rounded-lg mb-4"
                onError={(e) => {
                    setError(true)

                }}
            />

            <div className="flex items-center justify-between text-gray-400">
                <FaRegBookmark/>
            </div>
        </div>:null
    );

    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <img src={article.image} alt={article.title} className="w-full h-32 object-cover rounded-t-lg"/>
            <div className="p-2">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <div className="text-gray-400 text-sm mb-4">
                    <span>#{article.category}</span>
                    <span className="ml-2">{article.time}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                    <span>{article.reactions} Reactions</span>
                    <span>{article.comments} Comments</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
