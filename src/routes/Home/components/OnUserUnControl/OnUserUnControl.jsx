import React, { Component } from 'react'
import style from './OnUserUnControl.scss'
  
export class OnUserUnControl extends Component {
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
    <div className={[style.OnUserUnControlBox,'childcenter','childcolumn'].join(' ')}>
        OnUserUnControlBox
    </div>
   )
   }
}
export default OnUserUnControl