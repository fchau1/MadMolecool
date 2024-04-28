
"use client"

import { useState} from "react";

const fetchSearchResults = async (searchInput) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/chemcyclopedia/${searchInput}`);
        const {data} = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};

const fetchImg = async (searchInput) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/chemcyclopedia/img/${searchInput}`);
        const {data} = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};

const fetchMolecularWeight = async (searchInput) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/chemcyclopedia/molecular-weight/${searchInput}`);
        const {data} = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};

const Chemcyclopedia = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const[image, setImage] = useState(null);
    const[weight, setWeight] = useState(null);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        results = fetchSearchResults(searchTerm)
        resultingImage = fetchImg(searchTerm)
        resultingWeight = fetchImg(searchTerm)
        setSearchResults(searchResults)
        setImage(resultingImage)
        setWeight(resultingWeight)
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
            {searchResults && searchResults.map((result, index) => (
                <div key={index} className="border rounded p-4 mb-4">
                    <h3 className="text-lg font-bold mb-2">{result.title}</h3>
                    <p className="text-gray-700"><b>Description: </b>{result.description}</p>
                    <p className="text-gray-700"><b>Molecular Weight: </b>{weight}</p>
                    <img><img src={image} alt={alt} className={className} /></img>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Chemcyclopedia;