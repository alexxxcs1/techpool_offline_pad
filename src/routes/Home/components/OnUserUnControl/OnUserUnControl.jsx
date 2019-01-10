import React, { Component } from "react";
import style from "./OnUserUnControl.scss";
import PropTypes from "prop-types";
import LOGO from "assets/LOGO.png";

import SnatchAnswer from "./components/SnatchAnswer";
import RotationAnswer from "./components/RotationAnswer";
// import RaterGrade from "./components/RaterGrade";


import bg from "assets/bg.png";
import bgNoslogan from "assets/bg-noslogan.png";

import LoadingBox from "components/LoadingBox";

const bggroup = [bg, bgNoslogan];

export class OnUserUnControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      bgStatus: 0,
      stageStatus: null
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.customRoute = this.customRoute.bind(this);
    this.HandleCustomRoute = this.HandleCustomRoute.bind(this);
  }
  getChildContext() {
    return {
      HandleCustomRoute: this.HandleCustomRoute,
      data:this.state.data,
    };
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
    
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    this.state.data = props.data?props.data.data:this.state.data;
    this.state.stageStatus = props.data?props.data.route:this.state.stageStatus;
    this.setState(this.state);
  }
  customRoute() {
    switch (this.state.stageStatus) {
      default:
      case null:
        this.state.bgStatus = 0;
        return (
          <div className={[style.Loading, "childcenter","childcolumn"].join(" ")}>
            <LoadingBox />
            <div className={[style.WaitTips, "childcenter"].join(" ")}>
              请稍等
            </div>
          </div>
        );
      case "snatchanswer":
        this.state.bgStatus = 1;
        return <SnatchAnswer />;
      case 'rotationanswer':
        this.state.bgStatus = 1;
        return <RotationAnswer/>;
      // case 'ratergrade':
      //   this.state.bgStatus = 1;
      //   return <RaterGrade />
    }
    this.setState(this.state);
  }
  HandleCustomRoute(route){
    this.state.stageStatus = route;
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
          className={[
            style.NavTop,
            "childcenter",
            "childcolumn",
            "childcontentstart"
          ].join(" ")}>
          {/* 顶部导航栏 */}
          <div className={[style.LogoBox, "childcenter"].join(" ")}>
            <img src={LOGO} className={style.Logo} alt="" />
          </div>
          {/* 顶部LOGO ↑ */}
        </div>

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
OnUserUnControl.childContextTypes = {
  HandleCustomRoute: PropTypes.func,
  data: PropTypes.object,
};
export default OnUserUnControl;
