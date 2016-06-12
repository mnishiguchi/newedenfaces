// Import an instance of Alt created in `app/alt.js` file.
// It is a glue between all of our stores and actions.
import alt from '../alt';

class AddCharacterActions {

  constructor() {
    this.generateActions(
      'addCharacterSuccess',
      'addCharacterFail',
      'updateName',
      'updateGender',
      'invalidName',
      'invalidGender'
    );
  }

  addCharacter(name, gender) {
    $.ajax({
      type: 'POST',
      url: '/api/characters',
      data: { name: name, gender: gender }
    })
    .done( data => {
      this.actions.addCharacterSuccess( data.message );
    })
    .fail( jqXhr => {
      // Perhaps due to an invalid name or because it already exists in the database. 
      this.actions.addCharacterFail( jqXhr.responseJSON.message );
    });
  }
}

export default alt.createActions( AddCharacterActions );
