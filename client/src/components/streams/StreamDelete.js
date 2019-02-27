import React from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';

class StreamDelete extends React.Component {

  componentDidMount() {
      this.props.fetchStream(this.props.match.params.id);
  }

  actions = (
      <React.Fragment>
          <button onClick={ () => this.props.deleteStream(this.props.stream.id) } className="ui button negative">Delete</button>
          <Link to="/" className="ui button">Cancel</Link>
      </React.Fragment>
  );

  renderContent() {
      if(!this.props.stream) {
          return "Are you sure you want to delete the stream?";
      }

      return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
  }

  render() {
      //handle the case when user directly loads /streams/delete/:id in the browser:
      if(!this.props.isSignedIn) {
          return <div>Please Log in to delete streams.</div>;
      }

      return (
          <Modal
              title = "Delete Stream"
              content = { this.renderContent() }
              actions = { this.actions }
              onDismiss = { () => history.push("/") }
          />
      );
  }

}

const mapStateToProps = ({streams, auth}, ownProps) => { //ownProps === this.props
    return {
        stream : streams[ownProps.match.params.id],
        isSignedIn : auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
