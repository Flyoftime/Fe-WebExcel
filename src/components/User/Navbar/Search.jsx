"use client"
import React, { useState } from 'react'




const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (e) => {

        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSearch}
                className="hidden md:flex form-control items-center relative mr-4"
            >
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered pl-10 w-48 md:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Search