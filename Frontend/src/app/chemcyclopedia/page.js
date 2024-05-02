
"use client";

import React, { useState } from "react";

const fetchSearchResults = async (searchInput) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/chemcyclopedia/${searchInput}`);
        const { Title, Description } = await response.json();
        return { title: Title, description: Description };
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};

const Chemcyclopedia = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const result = await fetchSearchResults(term);
        setSearchResults(result ? [result] : null);
    };

    return (
        <div className="container mx-auto mt-8">
            <input
                type="search"
                className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                placeholder="Search a chemical"
                onChange={handleSearchChange}
            />
            <div className="mt-4">
                {searchResults && searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <div key={index} className="border rounded p-4 mb-4">
                            <h3 className="text-lg font-bold mb-2">{result.title}</h3>
                            <p className="text-gray-700">{result.description}</p>
                        </div>
                    ))
                ) : (
                    <NoSearchCard />
                )}
            </div>
        </div>
    );
};

const NoSearchCard = () => {
    return (
        <div className="max-w-lg text-2xl mx-auto text-gray-300">
            <div className="bg-white rounded-lg p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold ">No Search Results</h2>
                    <p className="mt-2 text-md ">{"Your search did not match any chemicals. Please try a different search term."}</p>
                </div>
            </div>
        </div>
    );
};

export default Chemcyclopedia;
