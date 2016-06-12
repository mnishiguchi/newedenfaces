// Import an instance of Alt created in `app/alt.js` file.
// It is a glue between all of our stores and actions.
import alt from '../alt';

import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
  constructor() {
    // A magical Alt method to bind actions to their handlers.
    this.bindActions( NavbarActions );

    // Initial state.
    this.totalCharacters    = 0;
    this.onlineUsers        = 0;
    this.searchQuery        = '';
    this.ajaxAnimationClass = '';
  }

  /**
   * Handles `findCharacterSuccess` action.
   */
  onFindCharacterSuccess( payload ) {
    payload.history.pushState(
      null,
      '/characters/' + payload.characterId
    );
  }

  /**
   * Handles `findCharacterFail` action.
   * Add a shaking animation to the input field.
   */
  onFindCharacterFail( payload ) {
    // Add the 'shake' CSS class to the search form then remove it after 1 second.
    payload.searchForm.classList.add( 'shake' );
    setTimeout( () => {
      payload.searchForm.classList.remove( 'shake' );
    }, 1000 );
  }

  /**
   * Handles `updateOnlineUsers` action.
   */
  onUpdateOnlineUsers( data ) {
    this.onlineUsers = data.onlineUsers;
  }

  /**
   * Handles `updateAjaxAnimation` action.
   */
  onUpdateAjaxAnimation( className ) {
    this.ajaxAnimationClass = className; // fadein or fadeout
  }

  /**
   * Handles `updateSearchQuery` action.
   */
  onUpdateSearchQuery( event ) {
    this.searchQuery = event.target.value;
  }

  /**
   * Handles `getCharacterCountSuccess` action.
   */
  onGetCharacterCountSuccess( data ) {
    this.totalCharacters = data.count;
  }

  /**
   * Handles `getCharacterCountFail` action.
   */
  onGetCharacterCountFail( jqXhr ) {
    toastr.error( jqXhr.responseJSON.message );
  }
}

export default alt.createStore( NavbarStore );
