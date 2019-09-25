import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapState = state => ({
    myuser: state.myuser
})
const mapDispatch = (dispatch) => ({
    myuserDispatch: dispatch.myuser
})

class Myuser extends Component {
    componentDidMount(){
        console.log(this.props.myuser)
    };
    render() {
        console.log(this.props.myuser)
        return (
            <div>
                    Myuser
            </div>
        );
    }
  }

  export default connect(mapState,mapDispatch)(Myuser);
