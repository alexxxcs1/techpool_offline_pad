import React, { Component } from "react";
import style from "./OnUserUnControl.scss";

import SnatchAnswer from "./components/SnatchAnswer";

import bg from "assets/bg.png";
import bgNoslogan from "assets/bg-noslogan.png";

import LoadingBox from "components/LoadingBox";

const bggroup = [bg, bgNoslogan];

export class OnUserUnControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgStatus: 0,
      stageStatus: null
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.customRoute = this.customRoute.bind(this);
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
        this.state.bgStatus = 0;
        return (
          <div className={style.Loading}>
            <LoadingBox />
            <div className={[style.WaitTips, "childcenter"].join(" ")}>
              请稍等
            </div>
          </div>
        );
      case "snatchanswer":
        this.state.bgStatus = 1;
        return <SnatchAnswer />;
    }
    this.setState(this.state);
  }
  render() {
    return (
      <div
        className={[
          style.OnUserUnControlBox,
          "childcenter",
          "childcolumn"
        ].join(" ")}>
        <div
          className={[style.DetialBox, "childcenter", "childcolumn"].join(" ")}>
          {this.customRoute()}
        </div>

        {/* 背景图片 ↓ */}
        <div
          className={style.Background}
          style={{ background: "url(" + bggroup[this.state.bgStatus] + ")" }}
        />
      </div>
    );
  }
}
export default OnUserUnControl;
