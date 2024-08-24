import React, {useEffect, useState} from 'react';
import NewsCard from "./NewsCard.jsx";
import { FaSearch } from 'react-icons/fa';
import {testApiCall} from "../common/apiCall/api.js";
import getGlobalState from '../stateManagement/global/globalSelector';
import getAuthState from '../stateManagement/auth/AuthSelector';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    isAuthenticated: getGlobalState(state)?.isAuthenticated,
    testData: getGlobalState(state)?.testData,
    userProfile: getAuthState(state)?.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
});


const News = (props) => {

    useEffect(() => {
        testApiCall().then(response=> console.log( response?.data)).catch(err=> console.log(err));
    }, []);


    useEffect(() => {
        console.log(window.location.href);
        console.log('............',props.testData);
    }, []);

    const newsArticles = [
        {
            title: '10+ Scalability Laws To Follow In Your Next Project.',
            category: 'architecture',
            time: '7m read time',
            image: 'https://via.placeholder.com/150', // Replace with actual image URL
            reactions: 56,
            comments: 2,
        },
        {
            title: 'Scaling to 1.2 Billion Daily API Requests with Caching at RevenueCat',
            category: 'infrastructure',
            time: '13m read time',
            image: 'https://via.placeholder.com/150', // Replace with actual image URL
            reactions: 60,
            comments: 0,
        },
        // Add more articles as needed
    ];
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="p-4 bg-gray-800 shadow-lg">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold">daily.dev</div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex flex-1 justify-center my-4 md:my-0 md:flex-none">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full p-2 pl-10 rounded-full bg-gray-700 text-white placeholder-gray-400"
                            />
                            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"/>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                        <button className="bg-blue-500 hover:bg-blue-700 p-2 rounded-full px-4">New Post</button>
                        {/* Profile, Notifications, etc. */}
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {newsArticles.map((article, index) => (
                        <NewsCard key={index} article={article}/>
                    ))}
                </div>
            </main>
        </div>

)
    ;
};
export default connect(mapStateToProps, mapDispatchToProps)(News);

