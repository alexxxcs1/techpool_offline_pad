import React, { Component } from 'react'
import style from './AlertBox.scss'
import DarkBox from 'components/DarkBox'
  
export class AlertBox extends Component {
constructor(props) {
  super(props);
  this.state = {
    value:'',
    callback:()=>{

    },
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.onClose = this.onClose.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    if(!props.option) return;
    this.state.value = props.option.value;
    this.state.callback = props.option.callback;
    this.setState(this.state);
}
onClose(){
    this.state.callback();
}
render() {
  return (
    <DarkBox>
        <div className={[style.AlertBox,'childcenter','childcolumn'].join(' ')}>
            <div className={[style.AlertInfo,'childcenter'].join(' ')}>
                {this.state.value}
            </div>
            <div className={[style.Button,'childcenter'].join(' ')} onClick={this.onClose}>确定</div>
        </div>
    </DarkBox>
   )
   }
}
export default AlertBox