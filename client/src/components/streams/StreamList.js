import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if(stream.userId === this.props.currentUserId) {
            return (
                <div className='right floated content'>
                    <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
                        EDIT
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className='ui button negative'>
                        DELETE
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        //the first time the component renders the this.props.posts is an empty object and the second has the posts objects
        return this.props.streams.map(stream => {  //standard JS map() cannot be used on objects
            return (
              <div className="item" key={stream.id} >
                  <i className='large middle aligned icon camera' />
                  <div className='content'>
                        <Link to={`/streams/${stream.id}`} className='header'>{stream.title}</Link>
                        <div className='description'>{stream.description}</div>
                  </div>
                  {this.renderAdmin(stream)}
              </div>
            );
        });
    }

    renderCreate() {
        if(this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }} >
                    <Link to='/streams/new' className="ui button primary">
                       CREATE STREAM
                    </Link>
                </div>
            );
        }
    }


    render() {
        return (
          <div>
              <h2>Streams</h2>
              <div className='ui celled list'>{ this.renderList() }</div>
              { this.renderCreate() }
          </div>
        );
    }
}

const mapStateToProps = ({ streams, auth }) => { //ownProps === this.props
    return {
      streams : Object.values(streams),
      currentUserId : auth.userId,
      isSignedIn : auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
