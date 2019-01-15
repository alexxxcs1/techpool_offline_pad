import React, { Component } from "react";
import style from "./RaterGrade.scss";
import LoadingBox from "components/LoadingBox";

import PropTypes from "prop-types";
import button from "assets/button.png";
import LongScroll from "assets/LongScroll.png";
import tablechild from "assets/tablechild.png";
import {api} from 'common/app'

export class RaterGrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id:null,
        data:null,
        score:[null,null,null,null]
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.HandleScoreClick = this.HandleScoreClick.bind(this);
    this.submitScore = this.submitScore.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.connectWebSocket();
  }
  refreshProps(props) {
      this.state.id = props.match.params.id;
      this.setState(this.state);
  }
  HandleScoreClick(index,score){
    this.state.score[index] = score;
    this.setState(this.state);
  }
  connectWebSocket(){
    let connection = new WebSocket('ws://192.168.10.2:8282');
    this.state.ws_connection = connection;
    this.setState(this.state);
    let self = this;
    //open connection
    connection.onopen = function () {
        var strf = {"type":"judge","action":"login","judgeid":self.state.id};//字符串
        connection.send(JSON.stringify(strf)); 
    };
    //onerror
    connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
    };
    connection.onclose = function () {
        window.location.reload();
    }
    //to receive the message from server
    connection.onmessage = function (e) {
      console.log('Server: ' + e.data);
      let data = JSON.parse(e.data);
      switch (data.action) {
        case 'judgeStart':
            self.state.data = data.result;
            self.setState(self.state);
            break;
        case 'unControl':
            self.state.data = null;
            self.setState(self.state);
        default:
          break;
      }
    };
    
  }
  submitScore(){
    let score = 0;
    for (let z = 0; z < this.state.score.length; z++) {
        score += this.state.score[z];
    }
    api.RaterSetGrade(this.state.data.id,this.state.id,score).then(res=>{
        console.log(res);
        if (res.code==200) {
            this.state.data=null;
            this.state.score = [null,null,null,null];
            this.setState(this.state);
        }else{

        }
        alert(res.message)
    },err=>{})
  }
  render() {
    return (
      <div
        className={[style.RaterGradeBox, "childcenter", "childcolumn"].join(
          " "
        )}>
        {this.state.data?<div className={[style.RaterGradeBox, "childcenter", "childcolumn"].join(
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
              {this.state.data.region}
            </div>

            <div
              className={style.UserName}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {this.state.data.username}
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
        <div className={[style.SubmitButton,'childcenter'].join(' ')} onClick={this.submitScore}>
            提交
        </div>

        </div>: <div className={[style.LoadingBox,'childcenter childcolumn'].join(' ')}><LoadingBox />还未开始打分</div> }
      </div>
    );
  }
}
export default RaterGrade;
