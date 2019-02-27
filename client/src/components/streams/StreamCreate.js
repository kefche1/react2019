import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }


    render() {

        //handle the case when user directly loads /streams/delete/:id in the browser:
        if(!this.props.isSignedIn) {
            return <div>Please Log in to create streams.</div>;
        }

        return (
          <div>
              <h3>Create a Stream</h3>
              <StreamForm onSubmit={ this.onSubmit } />
          </div>
        );
    }
}


const mapStateToProps = ({auth}, ownProps) => { //ownProps === this.props
    return {
        isSignedIn : auth.isSignedIn
    };
}

export default connect(mapStateToProps, { createStream })(StreamCreate);
