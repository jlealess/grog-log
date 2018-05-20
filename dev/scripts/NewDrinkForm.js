import React from 'react';

const NewDrinkForm = (props) => {
    return <form action="" id="newDrinkForm" onSubmit={props.handleSubmit}>
        <div>
          <label htmlFor="barName">Bar</label>
          <input type="text" required id="barName" name="barName" onChange={props.handleChange} value={props.barName} />
        </div>
        <div>
          <label htmlFor="drinkName">Drink</label>
          <input type="text" required id="drinkName" name="drinkName" onChange={props.handleChange} value={props.drinkName} />
        </div>
        <div>
          <label htmlFor="drinkNotes">Notes</label>
          <textarea name="drinkNotes" id="drinkNotes" onChange={props.handleChange} value={props.drinkNotes} />
        </div>
        <div className="form-flex">
          <div>
            <label htmlFor="drinkRating">Rating</label>
          </div>
          <div className="sentence-case">
            <input type="radio" name="drinkRating" id="drinkRatingGood" value="Good" onChange={props.handleChange} />
            <label htmlFor="drinkRatingGood">Good</label>
            <input type="radio" name="drinkRating" id="drinkRatingOK" value="OK" onChange={props.handleChange} />
            <label htmlFor="drinkRatingOK">OK</label>
            <input type="radio" name="drinkRating" id="drinkRatingBad" value="Bad" onChange={props.handleChange} />
            <label htmlFor="drinkRatingBad">Bad</label>
          </div>
        </div>
        <input type="submit" className="button button-submit" value="Log that grog" />
      </form>;
}

export default NewDrinkForm;