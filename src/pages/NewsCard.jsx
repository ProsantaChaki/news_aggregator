import React, { useState } from 'react';
import { FaRegComment, FaRegHeart, FaRegBookmark } from 'react-icons/fa';

const NewsCard = (props) => {
    const {article}= props;

    return (
        <div className="bg-gray-800 text-white rounded-lg p-4 shadow-lg">
            {/* Category Indicator */}
            <div className="flex items-center space-x-2 mb-2">
                <div className="bg-purple-500 p-2 rounded-full">
                    <FaRegBookmark className="text-white"/>
                </div>
            </div>


            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-gray-700 text-xs px-2 py-1 rounded">#architecture</span>
                <span className="bg-gray-700 text-xs px-2 py-1 rounded">#microservices</span>
            </div>


            <p className="text-gray-400 text-sm mb-4">{article.time}</p>

            {/* Image */}
            <img
                src="https://via.placeholder.com/400x200"
                alt="Article"
                className="w-full h-auto rounded-lg mb-4"
            />

            {/* Interaction Icons */}
            <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                        <FaRegHeart/> <span>{article.reactions} </span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <FaRegComment/> <span>{article.comments}</span>
                    </span>
                </div>
                <FaRegBookmark/>
            </div>
        </div>
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
