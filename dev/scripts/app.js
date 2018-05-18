import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';

import Header from './Header';
import NewDrinkForm from './NewDrinkForm';
import SearchForm from "./SearchForm";
import SearchResults from './SearchResults';
import BarList from './BarList';
import Footer from './Footer';

const config = {
  apiKey: "AIzaSyAH9g_wPpmZ2O8v1qQaiQASlZiWjPYdAxE",
  authDomain: "grog-log.firebaseapp.com",
  databaseURL: "https://grog-log.firebaseio.com",
  projectId: "grog-log",
  storageBucket: "",
  messagingSenderId: "1080037148216"
};

firebase.initializeApp(config);


class App extends React.Component {
    constructor() {
      super();

      this.state = {
        bars: [],
        drinks: [],
        barName: '',
        drinkName: '',
        drinkNotes: '',
        drinkRating: '',
        search: '',
        searchMatches: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {    
      const dbRef = firebase.database().ref('bars');
      dbRef.on('value', (snapshot) => {
        const bars = snapshot.val();
        // console.log(drinks);
        const barArray = []
        const drinkArray = [];

        
        for (let bar in bars) {
          bars[bar].key = bar;
          barArray.push(bars[bar]);
        }
        //console.log(barArray);

        const alphabetizeBarList = function(a, b) {
          const barA = a.barName;
          const barB = b.barName;

          let comparison = 0;
          if (barA > barB) {
            comparison = 1;
          } else if (barA < barB) {
            comparison = -1;
          }
          return comparison;
        }

        barArray.sort(alphabetizeBarList);


        this.setState({
          bars: barArray
        })
      })

    }


    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSearch(e) {
      e.preventDefault();
      const searchTerm = this.state.search;
      console.log(searchTerm);

      const barArray = Array.from(this.state.bars);
      const matchArray = [];
      for (let i=0; i < barArray.length; i++) {

        let thisBar = barArray[i];
        let thisBarsDrinks = thisBar.drinks;
        let thisBarsMatches = [];

        for (let j=0; j < thisBarsDrinks.length; j++) {
          if (thisBarsDrinks[j].drinkName === searchTerm) {
            //console.log(`Match! ${thisBarsDrinks[j].drinkName}`);
            thisBarsMatches.push(thisBarsDrinks[j]);
          }          
        }
        if (thisBarsMatches.length > 0) {
          //console.log(thisBarsMatches);
          const match = {};
          match.searchTerm = searchTerm;
          match.barName = thisBar.barName;
          match.drinks = thisBarsMatches;
          matchArray.push(match);
        }

      }
      console.log(matchArray);
      this.setState({
        searchMatches: matchArray
      },() => {
        console.log(this.state.searchMatches);
      })
      document.getElementById('searchResults').classList.remove('hidden');
      
    }

    handleSubmit(e) {
      e.preventDefault();

      let bar = {
        barName: this.state.barName,
        drinks: []
      }


      const drink = {
        drinkName: this.state.drinkName,
        drinkNotes: this.state.drinkNotes,
        drinkRating: this.state.drinkRating
      }

      const dbRef = firebase.database().ref('bars');

      const currentBars = Array.from(this.state.bars);
      console.log(currentBars);
      
      // check if barName is already in the database
      const barFound = currentBars.findIndex((currentBar) => {
        return currentBar.barName === bar.barName;
      }) 
      
      console.log(barFound);

      // if current bar isn't in the database, add it      
      if(barFound === -1) {
        currentBars.push(bar);
        //console.log(currentBars)
        // add drink to drinks array
        currentBars[currentBars.length - 1].drinks.push(drink)
        dbRef.push(currentBars[currentBars.length - 1]);
      }
      else {
  
        currentBars[barFound].drinks.push(drink)
  
        dbRef.child(currentBars[barFound].key)
          .update({
            drinks: currentBars[barFound].drinks
          });

      }

      console.log(currentBars);

      this.setState({
        barName: '',
        drinkName: '',
        drinkNotes: '',
        drinkRating: ''
      });    
      
      const radios = document.getElementsByName('drinkRating');
      for (let i=0; i<radios.length; i++) {
        radios[i].checked = false;
      }

    }

    render() {
      return <Router>
          <div>
            <Header />
            <main>
              <Route path="/add" render={() => <NewDrinkForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} barName={this.state.barName} drinkName={this.state.drinkName} drinkNotes={this.state.drinkNotes} />} />
              <Route path="/bars" render={() => <BarList bars={this.state.bars} />} />
              <Route path="/search" render={() => <SearchForm handleChange={this.handleChange} handleSearch={this.handleSearch} searchTerm={this.state.search} />} />
              <Route path="/search" render={() => <SearchResults searchMatches={this.state.searchMatches} searchTerm={this.state.search} />} />
              
            </main>
            <Footer />
          </div>
        </Router>;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
