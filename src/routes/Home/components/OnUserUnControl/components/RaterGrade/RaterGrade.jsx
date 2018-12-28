import React, { Component } from "react";
import style from "./RaterGrade.scss";

import PropTypes from "prop-types";
import button from "assets/button.png";
import LongScroll from "assets/LongScroll.png";
import tablechild from "assets/tablechild.png";

export class RaterGrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
        score:[null,null,null,null]
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.HandleScoreClick = this.HandleScoreClick.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  HandleScoreClick(index,score){
    this.state.score[index] = score;
    this.setState(this.state);
  }
  render() {
    return (
      <div
        className={[style.RaterGradeBox, "childcenter", "childcolumn"].join(
          " "
        )}>
        <div
          className={[style.PageTitle, "childcenter"].join(" ")}
          style={{ backgroundImage: "url(" + button + ")" }}>
          请为台上选手打分
        </div>
        <div
          className={[style.DetialBox, "childcenter",'childcolumn'].join(" ")}
          style={{ backgroundImage: "url(" + LongScroll + ")" }}>
          <div className={[style.BaseRow, "childcenter"].join(" ")}>
            <div
              className={style.UserRegion}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              上海大区
            </div>

            <div
              className={style.UserName}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              吴彦祖
            </div>
          </div>
          <div className={[style.BaseRow, "childcenter"].join(" ")}>
            <div className={[style.Title,'childcenter'].join(' ')}>
                观众吸引力
            </div>
            <div className={[style.ScoreButtonGroup,'childcenter'].join(' ')}>
                <div onClick={this.HandleScoreClick.bind(this,0,1)} className={[style.ScoreButton,this.state.score[0]==1?style.ActScoreButton:'',this.state.score[0]==1?style.ActScoreButton:'','childcenter'].join(' ')}>
                    1
                </div>
                <div onClick={this.HandleScoreClick.bind(this,0,2)} className={[style.ScoreButton,this.state.score[0]==2?style.ActScoreButton:'','childcenter'].join(' ')}>
                    2
                </div>
                <div onClick={this.HandleScoreClick.bind(this,0,3)} className={[style.ScoreButton,this.state.score[0]==3?style.ActScoreButton:'','childcenter'].join(' ')}>
                    3
                </div>
                <div onClick={this.HandleScoreClick.bind(this,0,4)} className={[style.ScoreButton,this.state.score[0]==4?style.ActScoreButton:'','childcenter'].join(' ')}>
                    4
                </div>
                <div onClick={this.HandleScoreClick.bind(this,0,5)} className={[style.ScoreButton,this.state.score[0]==5?style.ActScoreButton:'','childcenter'].join(' ')}>
                    5
                </div>
            </div>
          </div>
          <div className={[style.BaseRow, "childcenter"].join(" ")}>
            <div className={[style.Title,'childcenter'].join(' ')}>
                信息精准度
            </div>
            <div className={[style.ScoreButtonGroup,'childcenter'].join(' ')}>
                <div onClick={this.HandleScoreClick.bind(this,1,1)} className={[style.ScoreButton,this.state.score[1]==1?style.ActScoreButton:'','childcenter'].join(' ')}>
                    1
                </div>
                <div onClick={this.HandleScoreClick.bind(this,1,2)} className={[style.ScoreButton,this.state.score[1]==2?style.ActScoreButton:'','childcenter'].join(' ')}>
                    2
                </div>
                <div onClick={this.HandleScoreClick.bind(this,1,3)} className={[style.ScoreButton,this.state.score[1]==3?style.ActScoreButton:'','childcenter'].join(' ')}>
                    3
                </div>
                <div onClick={this.HandleScoreClick.bind(this,1,4)} className={[style.ScoreButton,this.state.score[1]==4?style.ActScoreButton:'','childcenter'].join(' ')}>
                    4
                </div>
                <div onClick={this.HandleScoreClick.bind(this,1,5)} className={[style.ScoreButton,this.state.score[1]==5?style.ActScoreButton:'','childcenter'].join(' ')}>
                    5
                </div>
            </div>
          </div>
          <div className={[style.BaseRow, "childcenter"].join(" ")}>
            <div className={[style.Title,'childcenter'].join(' ')}>
            现场表现力
            </div>
            <div className={[style.ScoreButtonGroup,'childcenter'].join(' ')}>
                <div onClick={this.HandleScoreClick.bind(this,2,1)} className={[style.ScoreButton,this.state.score[2]==1?style.ActScoreButton:'','childcenter'].join(' ')}>
                    1
                </div>
                <div onClick={this.HandleScoreClick.bind(this,2,2)} className={[style.ScoreButton,this.state.score[2]==2?style.ActScoreButton:'','childcenter'].join(' ')}>
                    2
                </div>
                <div onClick={this.HandleScoreClick.bind(this,2,3)} className={[style.ScoreButton,this.state.score[2]==3?style.ActScoreButton:'','childcenter'].join(' ')}>
                    3
                </div>
                <div onClick={this.HandleScoreClick.bind(this,2,4)} className={[style.ScoreButton,this.state.score[2]==4?style.ActScoreButton:'','childcenter'].join(' ')}>
                    4
                </div>
                <div onClick={this.HandleScoreClick.bind(this,2,5)} className={[style.ScoreButton,this.state.score[2]==5?style.ActScoreButton:'','childcenter'].join(' ')}>
                    5
                </div>
            </div>
          </div>
          <div className={[style.BaseRow, "childcenter"].join(" ")}>
            <div className={[style.Title,'childcenter'].join(' ')}>
            演讲印象分
            </div>
            <div className={[style.ScoreButtonGroup,'childcenter'].join(' ')}>
                <div onClick={this.HandleScoreClick.bind(this,3,1)} className={[style.ScoreButton,this.state.score[3]==1?style.ActScoreButton:'','childcenter'].join(' ')}>
                    1
                </div>
                <div onClick={this.HandleScoreClick.bind(this,3,2)} className={[style.ScoreButton,this.state.score[3]==2?style.ActScoreButton:'','childcenter'].join(' ')}>
                    2
                </div>
                <div onClick={this.HandleScoreClick.bind(this,3,3)} className={[style.ScoreButton,this.state.score[3]==3?style.ActScoreButton:'','childcenter'].join(' ')}>
                    3
                </div>
                <div onClick={this.HandleScoreClick.bind(this,3,4)} className={[style.ScoreButton,this.state.score[3]==4?style.ActScoreButton:'','childcenter'].join(' ')}>
                    4
                </div>
                <div onClick={this.HandleScoreClick.bind(this,3,5)} className={[style.ScoreButton,this.state.score[3]==5?style.ActScoreButton:'','childcenter'].join(' ')}>
                    5
                </div>
            </div>
          </div>
        </div>
        <div className={[style.SubmitButton,'childcenter'].join(' ')}>
            提交
        </div>
      </div>
    );
  }
}
export default RaterGrade;
