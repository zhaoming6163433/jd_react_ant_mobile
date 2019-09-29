import { NavBar, Icon } from 'antd-mobile';
import React, { Component } from 'react';
import { createHashHistory } from 'history';

const history = createHashHistory();

class myNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:props.pathname
        };
    }

    componentDidMount() {
        history.listen((route)=>{
            this.setState({title:route.pathname.split('/')[1]});
        })
    }
    render(){
        return (
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
                >{this.state.title}</NavBar>
            </div>
        )
    }
}

export default myNavBar;