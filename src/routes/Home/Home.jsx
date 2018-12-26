import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./Home.scss";
import OnUserControl from "./components/OnUserControl";
import OnUserUnControl from "./components/OnUserUnControl";
import LoginLayer from "./components/LoginLayer";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      onServerControl: false
    };
    this.HandleLogin = this.HandleLogin.bind(this); //控制登录页展示
    this.HandleServerControl = this.HandleServerControl.bind(this); //用于websocket控制页面。
  }
  getChildContext() {
    return {
      HandleLoginLayer: this.HandleLogin
    };
  }
  HandleLogin(boolean) {
    this.state.isLogin = boolean;
    this.setState(this.state);
  }
  HandleServerControl(boolean) {
    this.state.onServerControl = boolean;
    this.setState(this.state);
  }
  componentDidMount() {}
  render() {
    return (
      <div className={style.Box}>
        {/* ----登录页---- */}
        {this.state.isLogin ? (
          [this.state.onServerControl ? <OnUserUnControl /> : <OnUserControl />]
        ) : (
          <div className={style.FloatBox} style={{ zIndex: 2 }}>
            <LoginLayer />
          </div>
        )}
        {/* ----登录页---- */}
      </div>
    );
  }
}
Home.childContextTypes = {
  HandleLoginLayer: PropTypes.func
};
export default Home;
