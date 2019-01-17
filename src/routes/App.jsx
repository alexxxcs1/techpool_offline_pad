import React, { Component } from 'react';
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import PropTypes from "prop-types";
// import style from  './App.scss';
import FastClick from 'fastclick'

import AlertBox from 'components/AlertBox'

import Home from 'routes/Home'
import RaterGrade from 'routes/RaterGrade'

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
  componentDidMount(){
    FastClick.attach(document.body);
  }
  render() {
    return (
      <div style={{height: '100%'}} ref='maindiv'>
        {this.state.AlertOption.show?<AlertBox option={this.state.AlertOption}/>:''}
        <HashRouter >
          <div style={{height: '100%'}}>
              <Switch>
                  <Route path='/ratergrade/:id' component={RaterGrade} />
                  {/* 首页 */}
                  <Route path='/userhome' component={Home} />
                  <Redirect from="/" to="/userhome" />
                    
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
