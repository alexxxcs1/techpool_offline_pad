import React, { Component } from "react";
import style from "./BeginSnatch.scss";
import PropTypes from "prop-types";
import finger from "assets/finger.png";
import wardrum from "assets/wardrum.png";
import dong from "assets/dong.png";
import SelectQuestion from "../SelectQuestion";
import {api} from 'common/app'

export class BeginSnatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Snatched: false,
      onHiting: false
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.onHit = this.onHit.bind(this);
    this.JumpToAnswer = this.JumpToAnswer.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  onHit() {
    api.snatch(JSON.parse(window.localStorage.uinfo).sessionid).then(res=>{
      console.log(res);
      
    },err=>{
      console.log(err);
      
    })
    // let self = this;
    // if(Math.random() > 0.5){if (Math.random() > 0.5) {
    //   this.state.Snatched = true;
    //   this.state.onHiting = false;
    //   this.setState(this.state);
    // } else {
    //   this.context.SetAlertOption({
    //     show: true,
    //     value: "很遗憾，您没有抢到",
    //     callback: () => {
    //       self.state.onHiting = false;
    //       self.setState(this.state);
    //     }
    //   });
    // }}
    // this.state.onHiting = true;
    // this.setState(this.state);
  }
  JumpToAnswer(questionid){
      
      this.state.Snatched = false;
      this.setState(this.state);
      this.context.HandleSnatchAnswerRoute('answer',{
        SelectQuestionID:questionid
      });
  }
  render() {
    return (
      <div
        className={[style.BeginSnatchBox, "childcenter", "childcolumn"].join(
          " "
        )}>
        {this.state.Snatched?<SelectQuestion callback={this.JumpToAnswer}/>:''}
        <div className={style.TipsRow}>点击鼓面进行抢答</div>
        <div
          className={[
            style.ClickTips,
            "childcenter",
            "childcolumn",
            "childcontentend"
          ].join(" ")}>
          <div className={style.Eff} />
          <img src={finger} alt="" />
        </div>
        <div
          className={[
            style.wardrumBox,
            "childcenter",
            "childcolumn",
            "childcontentstart"
          ].join(" ")}
          style={{ backgroundImage: "url(" + wardrum + ")" }}>
          <div className={style.EffSound}>
            {this.state.onHiting ? (
              <img
                src={dong}
                key={Math.random() * 1024}
                className={style.EffText}
                style={{
                  "--posx": Math.random() * 575 + "px",
                  "--posy": Math.random() * 300 + "px"
                }}
                alt=""
              />
            ) : (
              ""
            )}
          </div>
          <div className={style.drum} onClick={this.onHit} />
        </div>
      </div>
    );
  }
}
BeginSnatch.contextTypes = {
  SetAlertOption: PropTypes.func,
  HandleSnatchAnswerRoute: PropTypes.func
};
export default BeginSnatch;
