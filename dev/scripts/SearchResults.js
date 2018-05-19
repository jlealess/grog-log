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
                            <h3>{match.drinks[0].drinkName} – {match.barName}</h3>
                            <p>Rating: {match.drinks[0].drinkRating}</p>
                            {match.drinks[0].drinkNotes.length > 0 &&
                                <p>Notes: {match.drinks[0].drinkNotes}</p>
                            }
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