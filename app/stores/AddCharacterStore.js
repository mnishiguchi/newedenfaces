// Import an instance of Alt created in `app/alt.js` file.
// It is a glue between all of our stores and actions.
import alt from '../alt';

import AddCharacterActions from '../actions/AddCharacterActions';

class AddCharacterStore {

  constructor() {
    // A magical Alt method to bind actions to their handlers.
    this.bindActions( AddCharacterActions );

    // Initial state.
    this.name      = '';
    this.gender    = '';
    this.helpBlock = '';
    // Refers to the validation states on form controls provided by Bootstrap.
    this.nameValidationState   = '';
    this.genderValidationState = '';
  }


  //---
  // Handers for actions.
  //---


  onAddCharacterSuccess( successMessage ) {
    this.nameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddCharacterFail( errorMessage ) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateName( event ) {
    this.name = event.target.value;
    this.nameValidationState = '';
    this.helpBlock = '';
  }

  onUpdateGender( event ) {
    this.gender = event.target.value;
    this.genderValidationState = '';
  }

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a character name.';
  }

  onInvalidGender() {
    this.genderValidationState = 'has-error';
  }
}

export default alt.createStore( AddCharacterStore );
