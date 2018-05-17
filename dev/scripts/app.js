import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import Header from './Header';
import NewDrinkForm from './NewDrinkForm';
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
        drinkRating: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      console.log('mounted');
    
      const dbRef = firebase.database().ref('drinks');
      dbRef.on('value', (snapshot) => {
        const drinks = snapshot.val();
        // console.log(drinks);

        const drinkArray = [];
        for (let drink in drinks) {
          drinks[drink].key = drink;
          drinkArray.push(drinks[drink]);
        }

        this.setState({
          drinks: drinkArray
        })
      })

    }

    createKey(bar) {
      return bar.toLower().replace(/[\s-.,]/g, '');
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit(e) {
      e.preventDefault();
      
      const drink = {
        barName: this.state.barName,
        drinkName: this.state.drinkName,
        drinkNotes: this.state.drinkNotes,
        drinkRating: this.state.drinkRating
      }
      console.log(drink);

      const dbRef = firebase.database().ref('drinks');
      dbRef.push(drink);

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
      return (
        <div>
          <Header />
          <main>
            <NewDrinkForm 
              handleChange={this.handleChange} 
              handleSubmit={this.handleSubmit} 
              barName={this.state.barName}
              drinkName={this.state.drinkName}
              drinkNotes={this.state.drinkNotes}
            />
            <h2>Bars Visited</h2>
            <BarList drinks={this.state.drinks} />
          </main>
          <Footer />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
