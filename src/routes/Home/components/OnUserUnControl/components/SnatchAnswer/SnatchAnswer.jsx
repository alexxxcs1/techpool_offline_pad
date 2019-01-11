import React, { Component } from "react";
import style from "./SnatchAnswer.scss";
import PropTypes from "prop-types";
import button from "assets/button.png";


import BeginSnatch from "./components/BeginSnatch";
import SelectQuestion from "./components/SelectQuestion";
import AnswerQuestion from "./components/AnswerQuestion";
import DarkBox from 'components/DarkBox'

export class SnatchAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageStatus: null,
      stageData:null,
      // SelectQuestionID: null
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.customRoute = this.customRoute.bind(this);
    this.HandleRoute = this.HandleRoute.bind(this);
  }
  getChildContext() {
    return {
      HandleSnatchAnswerRoute: this.HandleRoute,
      QuestionID:this.state.SelectQuestionID
    };
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    this.state.stageData = props.data?props.data:this.state.stageData;
    this.state.stageStatus = props.data?props.data.step:this.state.step;
    this.setState(this.state);
  }
  customRoute() {
    switch (this.state.stageStatus) {
      default:
      case 0:
        return <BeginSnatch/>;
      case 1:

        return ([<DarkBox>
                  <div className={[style.AlertBox,'childcenter','childcolumn'].join(' ')}>
                      <div className={[style.AlertInfo,'childcenter'].join(' ')}>
                        很遗憾，您没有抢到
                      </div>
                  </div>
                </DarkBox>,<BeginSnatch/>]);
      case 2:
        return <SelectQuestion data={this.state.stageData}/>;
      case 3:
        return <AnswerQuestion data={this.state.stageData}/>;
    }
  }
  HandleRoute(stageStatus, option) {
    if (option) {
      for (const key in option) {
        if (typeof this.state[key] != undefined) {
          this.state[key] = option[key];
        }
      }
    }
    this.state.stageStatus = stageStatus;
    this.setState(this.state);
  }
  render() {
    return (
      <div
        className={[style.SnatchAnswerBox, "childcenter", "childcolumn"].join(
          " "
        )}>
        <div
          className={[style.PageTitle, "childcenter"].join(" ")}
          style={{ backgroundImage: "url(" + button + ")" }}>
          回天有道
        </div>
        {this.customRoute()}
      </div>
    );
  }
}
SnatchAnswer.contextTypes = {
  SetAlertOption: PropTypes.func,
  data:PropTypes.object,
};
SnatchAnswer.childContextTypes = {
  HandleSnatchAnswerRoute: PropTypes.func,
  QuestionID:PropTypes.number
};
export default SnatchAnswer;
