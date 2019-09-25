/**
 * author mrhaoxiaojun
 * on 2018.04
 * des 路由4.0的异步组件加载 Code Splitting
 * https://blog.csdn.net/mrhaoxiaojun/article/details/80082477?utm_source=blogxgwz1
 */
import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
