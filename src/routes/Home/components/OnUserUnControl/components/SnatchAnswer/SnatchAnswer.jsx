import React, { Component } from "react";
import style from "./SnatchAnswer.scss";
import PropTypes from "prop-types";
import button from "assets/button.png";


import BeginSnatch from "./components/BeginSnatch";
import AnswerQuestion from "./components/AnswerQuestion";

export class SnatchAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageStatus: null,
      SelectQuestionID: null
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
  refreshProps(props) {}
  customRoute() {
    switch (this.state.stageStatus) {
      default:
      case null:
        return <BeginSnatch />;
      case "answer":
        return <AnswerQuestion />;
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
  SetAlertOption: PropTypes.func
};
SnatchAnswer.childContextTypes = {
  HandleSnatchAnswerRoute: PropTypes.func,
  QuestionID:PropTypes.number
};
export default SnatchAnswer;
