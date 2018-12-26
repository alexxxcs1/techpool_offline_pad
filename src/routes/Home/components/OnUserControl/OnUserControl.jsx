import React, { Component } from "react";
import style from "./OnUserControl.scss";
import UserIndex from "./components/UserIndex";
import Rank from "./components/Rank";
import Rule from "./components/Rule";
import PropTypes from "prop-types";

import LOGO from "assets/LOGO.png";
import returnindex from "assets/returnindex.png";
import userindexbutton from "assets/userindex.png";
import slogan from "assets/slogan.png";
import bg from "assets/bg.png";
import button from "assets/button.png";


export class OnUserControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageStatus: null
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.CustomRoute = this.CustomRoute.bind(this);
    this.HandleCustomRoute = this.HandleCustomRoute.bind(this);
  }
  getChildContext() {
    return {
      HandleCustomRoute: this.HandleCustomRoute
    };
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  CustomRoute() {
    switch (this.state.stageStatus) {
      default:
      case null:
        return (
          <div
            className={[
              style.ButtonGroup,
              "childcenter",
              "childcolumn",
              "childcontentstart"
            ].join(" ")}>
            <div
              className={[style.LinkButton, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + button + ")" }}
              onClick={this.HandleCustomRoute.bind(this, "userindex")}>
              个人中心
            </div>
            <div
              className={[style.LinkButton, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + button + ")" }}
              onClick={this.HandleCustomRoute.bind(this, "rank")}>
              琅琊榜
            </div>
            <div
              className={[style.LinkButton, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + button + ")" }}
              onClick={this.HandleCustomRoute.bind(this, "rule")}>
              活动规则
            </div>
          </div>
        );
        break;
      case "userindex":
        return <UserIndex />;
      case "rank":
        return <Rank />;
      case 'rule':
        return <Rule />
    }
  }
  HandleCustomRoute(route) {
    this.state.stageStatus = route;
    this.setState(this.state);
  }
  render() {
    return (
      <div
        className={[style.OnUserControlBox, "childcenter", "childcolumn"].join(
          " "
        )}>
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
          <div className={[style.HandleGroupBox, "childcenter"].join(" ")}>
            <div
              className={[
                style.HandleButtonBox,
                "childcenter",
                "childcontentstart"
              ].join(" ")}>
              {this.state.stageStatus != null ? <img
                src={returnindex}
                className={style.button}
                onClick={this.HandleCustomRoute.bind(this, null)}
                alt=""
              />:''}
            </div>
            <div
              className={[
                style.HandleButtonBox,
                "childcenter",
                "childcontentend"
              ].join(" ")}>
              {this.state.stageStatus!= 'userindex'?<img
                src={userindexbutton}
                className={style.button}
                onClick={this.HandleCustomRoute.bind(this, "userindex")}
                alt=""
              />:''}
            </div>
          </div>
          {/* 顶部导航按钮 ↑ */}
        </div>

        <div
          className={[
            style.DetialBox,
            "childcenter",
            "childcolumn",
            "childcontentstart"
          ].join(" ")}>
          {this.CustomRoute()}
        </div>

        {/* 背景图片 ↓ */}
        <div
          className={style.Background}
          style={{ background: "url(" + bg + ")" }}
        />
      </div>
    );
  }
}
OnUserControl.childContextTypes = {
  HandleCustomRoute: PropTypes.func
};
export default OnUserControl;
