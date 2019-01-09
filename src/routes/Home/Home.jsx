import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./Home.scss";
import OnUserControl from "./components/OnUserControl";
import OnUserUnControl from "./components/OnUserUnControl";
import LoginLayer from "./components/LoginLayer";
import {api} from 'common/app'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionID:null,
      WebSocketStatus:false,
      ws_connection:null,
      isLogin: false,
      onServerControl: false,
      WebSocketData:null,
    };
    this.HandleLogin = this.HandleLogin.bind(this); //控制登录页展示
    this.HandleServerControl = this.HandleServerControl.bind(this); //用于websocket控制页面。
    this.getServerMessage = this.getServerMessage.bind(this);
    this.isLogin = this.isLogin.bind(this);
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
  componentDidMount() {
    this.isLogin();
    this.connectWebSocket();

    
  }
  componentWillReceiveProps(){
    if(this.state.WebSocketStatus&&window.localStorage.uinfo){
      if(this.state.sessionID == JSON.parse(window.localStorage.uinfo).sessionid) return;
      this.state.sessionID = JSON.parse(window.localStorage.uinfo).sessionid;
      var type = 'user';//代表是用户组
      var action = 'login';//代表登录操作
      var result= {};//额外数据发到data中
      result.sessionid= JSON.parse(window.localStorage.uinfo).sessionid//当前绑定的用户id,登录接口返回
      var strf = {'type':type,'action':action,'result':result};//字符串
      this.state.ws_connection.send(JSON.stringify(strf)); 
      this.setState(this.state);
    }
  }
  isLogin(){
    if (window.localStorage.uinfo) {
      let uinfo = JSON.parse(window.localStorage.uinfo);
      if (uinfo.sessionid) {
        // this.props.history.push('/userhome/home')
        this.state.isLogin = true;
      }else{
        // this.props.history.push('/userhome/login')
        this.state.isLogin = false;
      }
    }else{
      // this.props.history.push('/userhome/login')
      this.state.isLogin = false;
    }
    // api.UserisLogin().then(res=>{
    //   if (res.code == 200) {
    //     this.props.history.push('/userhome/home')
    //   }else{
    //     this.props.history.push('/userhome/login')
    //   }
    //   this.setState(this.state);
    // },err=>{

    // });
  }
  connectWebSocket(){
    let connection = new WebSocket('ws://192.168.1.12:8282');
    this.state.ws_connection = connection;
    this.setState(this.state);
    let self = this;
    //open connection
    connection.onopen = function () {
      self.state.WebSocketStatus = true;
      self.setState(self.state);
      if(window.localStorage.uinfo){
        var type = 'user';//代表是用户组
        var action = 'login';//代表登录操作
        var result= {};//额外数据发到data中
        result.sessionid= JSON.parse(window.localStorage.uinfo).sessionid//当前绑定的用户id,登录接口返回
        var strf = {'type':type,'action':action,'result':result};//字符串
        connection.send(JSON.stringify(strf)); 
      }
    };
    //onerror
    connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
    };
    
    //to receive the message from server
    connection.onmessage = function (e) {
      console.log('Server: ' + e.data);
      let data = JSON.parse(e.data);
      switch (data.action) {
        case 'unloing':
          self.context.SetAlertOption({
            show: true,
            value: data.message,
            callback: () => {
              window.location.reload();
            }
          });
          window.localStorage.removeItem('uinfo');
          break;
        case 'pptStart':
          self.context.SetAlertOption({
            show: true,
            value: data.message,
            callback: () => {
              
            }
          });
          self.state.onServerControl = true;
          self.setState(self.state);
          break;
        case 'lundaBegin':
          self.context.SetAlertOption({
            show: true,
            value: data.message,
            callback: () => {
              
            }
          });
          self.state.onServerControl = true;
          self.setState(self.state);
          break;
        case 'lundaStart':
          self.context.SetAlertOption({
            show: true,
            value: data.message,
            callback: () => {
              
            }
          });
          self.state.onServerControl = true;
          self.setState(self.state);
          break;
        case 'questionStart':
          self.state.WebSocketData = {
            route:'rotationanswer',
            data:data.result,
          }
          self.state.onServerControl = true;
          self.setState(self.state);
          break;
        case 'questionEnd':
          self.state.WebSocketData = {
            route:null,
            data:null,
          }
          self.state.onServerControl = true;
          self.setState(self.state);
          break;
        case 'unControl':
          self.state.onServerControl = false;
          self.setState(self.state);
          break;
        case 'loginOut':
          window.localStorage.removeItem('uinfo');
          self.state.isLogin = false;
          self.setState(self.state);
        default:
          break;
      }
    };
    
  }
  getServerMessage(data){ //webscoket广播信息
    console.log(data);
  }
  render() {
    return (
      <div className={style.Box}>
        {/* ----登录页---- */}
        {this.state.isLogin ? (
          [this.state.onServerControl ? <OnUserUnControl data={this.state.WebSocketData}/> : <OnUserControl />]
        ) : (
          <div className={style.FloatBox} style={{ zIndex: 2 }}>
            <LoginLayer />
          </div>
        )}
        {/* ----登录页---- */}
        {/* <Switch>
          <Route path='/userhome/home' component={this.state.onServerControl?OnUserUnControl:OnUserControl} />
          <Route path='/userhome/login' component={LoginLayer} />
        </Switch> */}
      </div>
    );
  }
}
Home.childContextTypes = {
  HandleLoginLayer: PropTypes.func
};
Home.contextTypes = {
  SetAlertOption: PropTypes.func
};
export default Home;
