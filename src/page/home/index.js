import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import {connect} from 'react-redux';
import Effectcount from 'components/effectcount/index';
import { createHashHistory } from 'history';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom';
const history = createHashHistory();
const mapState = state => ({
    home: state.home
})
const mapDispatch = (dispatch) => ({
    homeDispatch: dispatch.home
})

class Home extends Component {
    componentDidMount(){
        console.log(this.props.home)
    };
    changeData = () => {
        history.push('/myuser');
    };
    render() {
        console.log(this.props.home)
        return (
            <div>
                <Button type="primary" onClick={this.changeData}>跳转页面</Button>
                <Effectcount />
                <div>
                   111
                </div>
            </div>
        );
    }
  }

  export default connect(mapState,mapDispatch)(Home);
