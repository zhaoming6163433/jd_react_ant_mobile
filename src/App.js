import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { post_user_info } from './services/api';
import Routes from '@/routes/index';
import emitter from "utils/ev"
import TabBar from 'components/tabBar/index';
import NavBar from 'components/navBar/index';
import asyncComponent from 'routes/AsyncComponent';
import uitl from 'utils/util.js';
import './App.scss';

const login = asyncComponent(() => import('@/page/login'));
const mapState = state => ({
  count: state.count,
  initpathname: uitl.getRouteUrl()
})

const mapDispatch = (dispatch) => ({
  countDispatch: dispatch.count
})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initpathname: uitl.getRouteUrl()
        };
      }
    componentDidMount() {
        this.base_getids('');
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
    const { initpathname } = this.state;
    const routers = Routes.map((item, index) => {
      return item.exact ? <Route key={index} exact path={item.path} component={item.component} /> : <Route key={index} path={item.path} component={item.component} />;
    });
    return (
        <Router>
            <HashRouter>
                <Route path='/login' exact component={login}/>
                <Route path="/" render={({history,location,match})=>{
                    if(history.location.pathname!="/login"){
                        return (
                            <div className="App">
                                <NavBar pathname={initpathname}/>
                                <Switch>{routers}</Switch>
                                <TabBar pathname={initpathname}/>
                            </div>
                        )
                    }
                }}/>
            </HashRouter>
        </Router>
    );
  }
}

// export default App;
export default connect(mapState, mapDispatch)(App);
