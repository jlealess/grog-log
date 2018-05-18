import React from 'react';

class SearchResults extends React.Component {
    componentDidMount() {
        this.setState({
            search: '',
            searchMatches: []
        })
    }

    render() {
        const hasResults = this.props.searchMatches.length > 0 ? (
                <ul className="search-results-list">
                    {this.props.searchMatches.map((match, i) => {
                        return <li key={`matches-${i}`}>
                            <h3>{match.drinks[0].drinkName}</h3>
                            <p>{match.barName}</p>
                            <p>Rating: {match.drinks[0].drinkRating}</p>
                            <p>{match.drinks[0].drinkNotes}</p>
                        </li>
                    })}
                </ul>
        ) : (<p>No results</p>);

        return(
            <div className="search-results hidden" id="searchResults">
                <h2>Search results for {this.props.searchTerm}</h2>
                {hasResults}
            </div>
        );
    }
}

export default SearchResults;