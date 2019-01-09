import React, { Component } from 'react'
import style from './RotationAnswer.scss'
import AnswerQuestion from './components/AnswerQuestion'
import PropTypes from "prop-types";

import button from "assets/button.png";
  
export class RotationAnswer extends Component {
constructor(props) {
  super(props);
  this.state = {};
  this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
render() {
  return (
    <div className={[style.RotationAnswerBox,'childcenter','childcolumn'].join(' ')}>
        <div
          className={[style.PageTitle, "childcenter"].join(" ")}
          style={{ backgroundImage: "url(" + button + ")" }}>
          甲冠天下
        </div>
        <AnswerQuestion data={this.context.data}/>
    </div>
   )
   }
}
RotationAnswer.contextTypes = {
    data:PropTypes.object,
    SetAlertOption: PropTypes.func
};
export default RotationAnswer