/**
 * Consists of a simple form with a text field, radio buttons and
 * a submit button.
 * Success and error messages will be displayed within help-block
 * under the text field.
 */

 import React from 'react';
 import AddCharacterStore   from '../stores/AddCharacterStore';
 import AddCharacterActions from '../actions/AddCharacterActions';

 class AddCharacter extends React.Component {

   constructor( props ) {
     super( props );

     // Initialize the state.
     this.state    = AddCharacterStore.getState();

     // Bind methods to this component instance.
     this.onChange = this.onChange.bind( this );
   }

   componentDidMount() {
     // Listen for changes in state.
     AddCharacterStore.listen( this.onChange );
   }

   componentWillUnmount() {
     // Stop listening for changes in state.
     AddCharacterStore.unlisten( this.onChange );
   }

   onChange( state ) {
     // Update the state and trigger the re-rendering.
     // NOTE: Object `this` will be undefined without binding it explicitly.
     this.setState( state );
   }

   handleSubmit( event ) {
     event.preventDefault();

     const name   = this.state.name.trim();
     const gender = this.state.gender;

     // Validate presence of name.
     if ( !name ) {
       AddCharacterActions.invalidName();
       this.refs.nameTextField.getDOMNode().focus();
     }

     // Validate presence of gender.
     if ( !gender ) {
       AddCharacterActions.invalidGender();
     }

     // Process it.
     if ( name && gender ) {
       AddCharacterActions.addCharacter( name, gender );
     }
   }

   render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Character</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={ 'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>Character Name</label>
                    <input
                      type='text'
                      className='form-control'
                      ref='nameTextField'
                      value={this.state.name} onChange={AddCharacterActions.updateName}
                      autoFocus
                    />
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={ 'form-group ' + this.state.genderValidationState}>
                    <div className='radio radio-inline'>
                      <input
                        type='radio'
                        name='gender'
                        id='female'
                        value='Female'
                        checked={this.state.gender==='Female' } onChange={AddCharacterActions.updateGender}
                      />
                      <label htmlFor='female'>Female</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input
                        type='radio'
                        name='gender'
                        id='male'
                        value='Male'
                        checked={this.state.gender==='Male' } onChange={AddCharacterActions.updateGender}
                      />
                      <label htmlFor='male'>Male</label>
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='btn btn-primary'>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
     );
   }
 }

 export default AddCharacter;
