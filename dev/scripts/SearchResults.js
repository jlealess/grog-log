import React from 'react';

class SearchResults extends React.Component {
  // componentDidMount() {
  //   this.setState({
  //     search: '',
  //     searchMatches: []
  //   });
  // }

  renderSwitch(drinkRating) {
    switch (drinkRating) {
      case "Bad":
        return <i className="fas fa-skull" />;
      case "Good":
        return <i className="fas fa-fire" />;
      default:
        return "";
    }
  }

  render() {
    const hasResults =
      this.props.searchMatches.length > 0 ? (
        <ul className="search-results-list">
          {this.props.searchMatches.map((match, i) => {
            return (
              <li key={`matches-${i}`}>
                <h3>
                        {match.barName} – {match.drinks[0].drinkName} {this.renderSwitch(match.drinks[0].drinkRating)}
                </h3>
                {match.drinks[0].drinkNotes.length > 0 && (
                  <p className="notes">Notes: {match.drinks[0].drinkNotes}</p>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No results</p>
      );

    return (
      <div className="search-results hidden" id="searchResults">
        <h2>Search results for {this.props.searchTerm}</h2>
        {hasResults}
      </div>
    );
  }
}

export default SearchResults;