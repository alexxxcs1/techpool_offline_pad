import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./LoginLayer.scss";

import LOGO from "assets/LOGO.png";
import returnindex from "assets/returnindex.png";
import userindex from "assets/userindex.png";
import slogan from "assets/slogan.png";
import bg from "assets/bg.png";
import button from "assets/button.png";

import {api} from 'common/app'

export class LoginLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: ""
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.HandleLogin = this.HandleLogin.bind(this);
    this.HandleInputValue = this.HandleInputValue.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  HandleLogin() {
    
    if (!this.state.name||!this.state.id) {
      this.context.SetAlertOption({
        show: true,
        value: "信息输入有错误，请重新输入",
        callback: () => {}
      });
    } else {
      let self = this;
      api.UserLogin(this.state.name,this.state.id).then(res=>{
        if (res.code==200) {
          window.localStorage.uinfo = JSON.stringify({'sessionid':res.result.sessionid});
          // this.context.HandleLoginLayer(true)
          window.location.reload();
        }else{
          self.context.SetAlertOption({
            show: true,
            value: res.message,
            callback: () => {}
          });
        }
      },err=>{});
      
    }
  }
  HandleInputValue(type, e) {
    //   console.log(type,e.target.value);
    this.state[type] = e.target.value;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.LoginLayer}>
        <div
          className={[
            style.NavTop,
            "childcenter",
            "childcolumn",
            "childcontentstart"
          ].join(" ")}>
          {/* 顶部导航栏 */}
          <div className={[style.LogoBox, "childcenter"].join(" ")}>
            <img src={LOGO} className={style.Logo} alt="" />
          </div>
          {/* 顶部LOGO ↑ */}
          {/* <div className={[style.HandleGroupBox, "childcenter"].join(" ")}>
            <div
              className={[
                style.HandleButtonBox,
                "childcenter",
                "childcontentstart"
              ].join(" ")}>
              <img src={returnindex} className={style.button} alt="" />
            </div>
            <div
              className={[
                style.HandleButtonBox,
                "childcenter",
                "childcontentend"
              ].join(" ")}>
              <img src={userindex} className={style.button} alt="" />
            </div>
          </div> */}
          {/* 顶部导航按钮 ↑ */}
        </div>

        <div
          className={[
            style.DetialBox,
            "childcenter",
            "childcolumn",
            "childcontentstart"
          ].join(" ")}>
          <div
            className={[style.LoginBox, "childcenter", "childcolumn"].join(
              " "
            )}>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div className={[style.InputTitle, "childcenter"].join(" ")}>
                姓名：
              </div>
              <input
                type="text"
                value={this.state.name}
                className={style.Inputs}
                onChange={this.HandleInputValue.bind(this, "name")}
              />
            </div>
            <div className={[style.InputBox, "childcenter"].join(" ")}>
              <div className={[style.InputTitle, "childcenter"].join(" ")}>
                工号：
              </div>
              <input
                type="text"
                value={this.state.id}
                className={style.Inputs}
                onChange={this.HandleInputValue.bind(this, "id")}
              />
            </div>
          </div>
          <div
            className={[style.LoginButton, "childcenter"].join(" ")}
            style={{ backgroundImage: "url(" + button + ")" }}
            onClick={this.HandleLogin}>
            登录
          </div>
        </div>

        {/* 背景图片 ↓ */}
        <div
          className={style.Background}
          style={{ backgroundImage: "url(" + bg + ")" }}
        />
      </div>
    );
  }
}
LoginLayer.contextTypes = {
  HandleLoginLayer: PropTypes.func,
  SetAlertOption: PropTypes.func
};
export default LoginLayer;
