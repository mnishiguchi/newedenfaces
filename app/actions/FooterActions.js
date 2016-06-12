// Import an instance of Alt created in `app/alt.js` file.
// It is a glue between all of our stores and actions.
import alt from '../alt';

class FooterActions {

  constructor() {
    this.generateActions(
      'getTopCharactersSuccess',
      'getTopCharactersFail',
      'ajaxInProgress', // unused
      'ajaxComplete'    // unused
    );
  }

  getTopCharacters() {
    $.ajax({
      url: '/api/characters/top'
    })
    .done( data => {
      this.actions.getTopCharactersSuccess( data );
    })
    .fail( jqXhr => {
      this.actions.getTopCharactersFail( jqXhr );
    })
  }
}

export default alt.createActions( FooterActions );
