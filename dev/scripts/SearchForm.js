import React from 'react';

const SearchForm = (props) => {
    return <form action="" id="searchForm" className="search-form" onSubmit={props.handleSearch}>
        <label htmlFor="search" className="visually-hidden">Search</label>
        <input type="search" name="search" id="search" onChange={props.handleChange} value={props.searchTerm} required />
        <input type="submit" value="Search" />
      </form>;
}

export default SearchForm;