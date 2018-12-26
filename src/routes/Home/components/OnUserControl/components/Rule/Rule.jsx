import React, { Component } from 'react'
import style from './Rule.scss'
import button from "assets/button.png";
import rule from "assets/rule.png";
  
export class Rule extends Component {
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
    <div class={[style.RuleBox, "childcenter", "childcolumn"].join(" ")}>
        <div
          className={[style.PageTitle, "childcenter"].join(" ")}
          style={{ backgroundImage: "url(" + button + ")" }}>
          活动规则
        </div>
        <div class={[style.RuleDetial,'childcenter','childcolumn','childcontentstart'].join(' ')}>
            <img src={rule} alt=""/>
        </div>
    </div>
   )
   }
}
export default Rule