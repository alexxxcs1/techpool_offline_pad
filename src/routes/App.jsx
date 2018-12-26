import React, { Component } from 'react';
import { HashRouter,Route,Switch} from 'react-router-dom';
import PropTypes from "prop-types";
// import style from  './App.scss';
import AlertBox from 'components/AlertBox'

import Home from 'routes/Home'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      AlertOption:{
        show:false,
        value:'',
        callback:this.InterceptAlertCallback.bind(this,()=>{})
      }
    }
    this.InterceptAlertCallback = this.InterceptAlertCallback.bind(this);
    this.SetAlertOption = this.SetAlertOption.bind(this);
  }
  getChildContext() {
    return {
      SetAlertOption:this.SetAlertOption,
    };
  }
  InterceptAlertCallback(callback){
    this.state.AlertOption.show = false;
    callback();
    this.setState(this.state);
  }
  SetAlertOption(option){
    if(option.callback){
      option.callback = this.InterceptAlertCallback.bind(this,option.callback);
      this.state.AlertOption = option;
    }else{
      this.state.AlertOption = option;
    }
    this.setState(this.state);
  }
  render() {
    return (
      <div style={{height: '100%'}}>
        {this.state.AlertOption.show?<AlertBox option={this.state.AlertOption}/>:''}
        <HashRouter >
          <div style={{height: '100%'}}>
              <Switch>
                  
                  {/* 首页 */}
                  <Route path='/' component={Home} />
                    
              </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}
App.childContextTypes = {
  SetAlertOption: PropTypes.func,
};
export default App;
