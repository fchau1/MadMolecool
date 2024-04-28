
"use client"

import { useState} from "react";
import SearchBar from './SearchBar';

const fetchSearchResults = async (searchInput) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/chemcyclopedia?name=${searchInput}`);
        const {data} = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};

const Chemcyclopedia = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        results = fetchSearchResults(searchTerm)
        setSearchResults(searchResults)
    };

    return (
        <div className="container mx-auto mt-8">
            <SearchBar placeholder="Search a chemical" handleChange={handleSearchChange} />

            <div className="mt-4">
            {searchResults && searchResults.map((result, index) => (
                <div key={index} className="border rounded p-4 mb-4">
                    <h3 className="text-lg font-bold mb-2">{result.title}</h3>
                    <p className="text-gray-700">{result.description}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Chemcyclopedia;