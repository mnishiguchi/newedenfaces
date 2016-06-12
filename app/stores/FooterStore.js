// Import an instance of Alt created in `app/alt.js` file.
// It is a glue between all of our stores and actions.
import alt from '../alt';

import FooterActions from '../actions/FooterActions';

class FooterStore {

  constructor() {
    // A magical Alt method to bind actions to their handlers.
    this.bindActions( FooterActions );

    // Initial state.
    this.characters = [];
  }


  //---
  // Handers for actions.
  //---


  onGetTopCharactersSuccess(data) {
    this.characters = data.slice( 0, 5 );
  }

  onGetTopCharactersFail( jqXhr ) {
    // Handle multiple response formats, fallback to HTTP status code number.
    toastr.error(
      jqXhr.responseJSON && jqXhr.responseJSON.message
        || jqXhr.responseText // Fallback 1
        || jqXhr.statusText   // Fallback 2
    );
  }
}

export default alt.createStore( FooterStore );
