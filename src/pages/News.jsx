
import React, {useEffect, useState} from 'react';
import NewsCard from "./NewsCard.jsx";
import getGlobalState from '../stateManagement/global/globalSelector';
import getAuthState from '../stateManagement/auth/AuthSelector';
import { connect } from 'react-redux';
import { newsApiCallWorker } from '../stateManagement/global/GlobalActionCreators';
import * as process from "node:process";
import { FaSearch, FaFilter } from 'react-icons/fa';


const mapStateToProps = (state) => ({
    isAuthenticated: getGlobalState(state)?.isAuthenticated,
    newsArticles: getGlobalState(state)?.news,
    userProfile: getAuthState(state)?.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
    newsApiCallWorkerProp: (data) => dispatch(newsApiCallWorker(data)),

});


const News = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSource, setSelectedSource] = useState('all');
    useEffect(() => {
        props.newsApiCallWorkerProp({
            search: searchTerm.toLowerCase(),
            source:selectedSource,
            category:selectedCategory,
            date:selectedDate
        });
    }, [searchTerm,selectedDate,selectedCategory,selectedSource]);


    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSourceChange = (e) => {
        setSelectedSource(e.target.value);
    };

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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"/>
                        </div>
                    </div>

                    {/* Filter Button */}
                    <div className="flex items-center space-x-4">
                        <button
                            className="flex items-center bg-blue-500 hover:bg-blue-700 p-2 rounded-full"
                            onClick={() => setShowFilters(!showFilters)}>
                            <FaFilter className="mr-2"/> Filter
                        </button>
                    </div>
                </div>
            </header>

            {/* Filter Options */}
            {showFilters && (
                <div className="p-4 bg-gray-800 shadow-lg">
                    <div className="container mx-auto flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block mb-2 text-sm font-medium text-gray-300">Date Range</label>
                            <input
                                type="date"
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block mb-2 text-sm font-medium text-gray-300">Category</label>
                            <select
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value={'all'}>All</option>
                                <option value={'technology'}>Technology</option>
                                <option value={'science'}>Science</option>
                                <option value={'business'}>Business</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block mb-2 text-sm font-medium text-gray-300">Source</label>
                            <select
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                value={selectedSource}
                                onChange={handleSourceChange}
                            >
                                <option value={'all'}>All</option>
                                <option value={'ny_time'}>NY Times</option>
                                <option value={'news_api'}>NEWS API</option>
                                <option value={'news_ap_org'}>NEWS API ORG</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <main className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {props.newsArticles.map((article, index) => (
                        <NewsCard key={index} article={article}/>
                    ))}
                </div>
            </main>
        </div>

    );
};
export default connect(mapStateToProps, mapDispatchToProps)(News);

