import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom';
import Routes from '@/routes/index';
import { connect } from 'react-redux';
import { post_user_info } from './services/api';
import emitter from "utils/ev"

import './App.scss';
const mapState = state => ({
  count: state.count
})

const mapDispatch = (dispatch) => ({
  countDispatch: dispatch.count
})

class App extends Component {
  componentDidMount() {
    this.base_getids('');
    // console.log(getState)

    }
    handleClick = () => {
        emitter.emit("callMe","Hello")
        this.props.countDispatch.increment(10)
    };
    handleClick2 = () => {
      this.props.countDispatch.incrementAsync(20)
    };
    //获取用户信息
    async base_getids(){
      try{
          let res = await post_user_info("");
          console.log(res)
      }catch(e){
    }
  }
  render() {
    const routers = Routes.map((item, index) => {
      return item.exact ? <Route key={index} exact path={item.path} component={item.component} /> : <Route key={index} path={item.path} component={item.component} />;
    });
    return (
        <Router>
          <HashRouter>
            <div className="App">
                <Switch>{routers}</Switch>
            </div>
          </HashRouter>
        </Router>
    );
  }
}

// export default App;
export default connect(mapState, mapDispatch)(App);
