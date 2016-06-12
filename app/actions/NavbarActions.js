// Import an instance of Alt created in `app/alt.js` file.
// It is a glue between all of our stores and actions.
import alt from '../alt';

// Import a utility function.
import {assign} from 'underscore';

class NavbarActions {

  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation',
      'updateSearchQuery',
      'getCharacterCountSuccess',
      'getCharacterCountFail',
      'findCharacterSuccess',
      'findCharacterFail'
    );
  }

  /**
   * Find a character by name.
   */
  findCharacter( payload ) {
    $.ajax({
      url: '/api/characters/search',
      data: { name: payload.searchQuery }
    })
    .done( data => {
      assign( payload, data );
      this.actions.findCharacterSuccess( payload );
    })
    .fail( () => {
      this.actions.findCharacterFail( payload );
    })
  }

  /**
   * Fetch total number of characters from the server.
   */
  getCharacterCount() {
    $.ajax({
      url: '/api/characters/count'
    })
    .done( data => {
      // Return total number of characters.
      this.actions.getCharacterCountSuccess( data );
    })
    .fail( jqXhr => {
      // Return jQuery jqXhr object.
      this.actions.getCharacterCountFail( jqXhr );
    })
  }
}

export default alt.createActions( NavbarActions );
