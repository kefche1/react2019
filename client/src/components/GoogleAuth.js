import React from 'react';
import { connect } from 'react-redux';
import { signInOut } from '../actions';

class GoogleAuth extends React.Component {
  // state = {isSignedIn: null}; //null because we dont know if user is signed in;

  componentDidMount() {
    window.gapi.load('client:auth2', async () => {  //loads the library/ies we need in this case 'client:auth2'
      await window.gapi.client.init({               //initializes the library
        clientId: '494841769649-ug7rscri9bsftui8b5g17nf0tftblap8.apps.googleusercontent.com',
        scope: 'email'
      });
      this.auth = window.gapi.auth2.getAuthInstance();
      this.onAuthChange(this.auth.isSignedIn.get());
      // this.setState({isSignedIn: this.auth.isSignedIn.get()});
      this.auth.isSignedIn.listen(this.onAuthChange);  //event listener for user sign in/out
    });
  }

  onAuthChange = (isSignedIn) => {
    // this.setState({isSignedIn: this.auth.isSignedIn.get()});
      this.props.signInOut(isSignedIn, this.auth.currentUser.get().getId());
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className='ui red google button' onClick={this.onSignOutClick}>
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className='ui green google button' onClick={this.onSignInClick}>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {isSignedIn: auth.isSignedIn};
}

export default connect(
  mapStateToProps,
  {signInOut}      //store.dispatch(selectSong) is auto called by Redux!
)(GoogleAuth);
