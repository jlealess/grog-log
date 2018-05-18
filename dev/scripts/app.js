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
      // create an array of bars in state - done
      // change dbRef to 'bars' - done
      // within bars have entries which are bar names, within that --> nested object of drinks - done
      // when pushing need to check if bar name exists already
      // if bar name exists already push to that object
      // if does not, make db reference to new bar
      // inside that push new drink(s)

      // drinks array becomes array of drinks for that bar
    
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
        console.log(barArray);

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
        console.log(currentBars)
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
            <BarList bars={this.state.bars} />
          </main>
          <Footer />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
