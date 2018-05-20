import React from 'react';

const SearchForm = (props) => {
    return <form action="" id="searchForm" className="search-form" onSubmit={props.handleSearch}>
        <label htmlFor="search">
          Search
        </label>
        <div className="search-bar">
            <input type="search" name="search" id="search" onChange={props.handleChange} value={props.searchTerm} required />
            <button name="search" className="button button-search">
                <i class="fas fa-search" />
            </button>
        </div>
      </form>
}

export default SearchForm;