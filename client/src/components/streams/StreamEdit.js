import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>;
        }

        //handle the case when user directly loads /streams/delete/:id in the browser:
        if(!this.props.isSignedIn) {
            return <div>Please Log in to edit streams.</div>;
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm onSubmit={ this.onSubmit } initialValues={ _.pick(this.props.stream, ['title', 'description']) } />
            </div>
        );
    }
}

const mapStateToProps = ({streams, auth}, ownProps) => { //ownProps === this.props
    return {
        stream : streams[ownProps.match.params.id],
        isSignedIn : auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
