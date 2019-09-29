import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapState = state => ({
    login: state.myuser
})
const mapDispatch = (dispatch) => ({
    loginDispatch: dispatch.login
})

class Login extends Component {
    componentDidUpdate (prevProps, prevState) {
    };
    componentDidMount(){
    };
    render() {
        console.log(this.props.login)
        return (
            <div>
                login
            </div>
        );
    }
  }

  export default connect(mapState,mapDispatch)(Login);
