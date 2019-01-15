import React, { Component } from "react";
import style from "./AnswerQuestion.scss";
import PropTypes from "prop-types";
import LongScroll from "assets/LongScroll.png";
import ShortScroll from "assets/ShortScroll.png";
import DarkBox from "components/DarkBox";
import {api} from 'common/app'

export class AnswerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      selected: null,
      resultStatus:null,
      userResult:null,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.SelectOption = this.SelectOption.bind(this);
    this.submit = this.submit.bind(this);
    this.returnToSnatch = this.returnToSnatch.bind(this);
    this.createOption = this.createOption.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    this.state.data = props.data?props.data:this.state.data;
    this.state.resultStatus = props.data?props.data.userResult:this.state.data;
    console.log(this.state.data);
    
    this.setState(this.state);
  }
  SelectOption(index) {
    this.state.selected = index;
    this.setState(this.state);
  }
  submit() {
    if(!this.state.data) return;
    let sessionid = JSON.parse(window.localStorage.uinfo).sessionid;
    let self = this;
    if (this.state.selected!=null) {
        this.state.onAjax = true;
        this.setState(this.state);
        api.RotationQuestionAnswer(this.state.data.id, sessionid,this.state.selected).then(res=>{
          if (res.code == 200) {
            if(self.state.selected == self.state.data.success){
              self.state.resultStatus = 'success';
            }else{
              self.state.resultStatus = 'error';
            }
            
          }else{
            alert(res.message)
          }
          self.state.onAjax = false;
            self.setState(this.state);
        },err=>{})
    }
    
  }
  returnToSnatch(){
      // this.context.HandleSnatchAnswerRoute(null);
  }
  createOption(){
    if (!this.state.data) return;
    let result = [];
    for (const key in this.state.data.check) {
      result.push(<div
        className={[
          style.OptionBox,
          this.state.selected == key ? style.ActOption : "",
          "childcenter childcontentstart",
        ].join(" ")}
        onClick={this.SelectOption.bind(this, key)}>
        {key}. {this.state.data.check[key]}
      </div>)
    }
    return result;
  }
  render() {
    return [
      <div
        className={[style.AnswerQuestionBox, "childcenter"].join(" ")}
        style={{ backgroundImage: "url(" + LongScroll + ")" }}>
        {this.state.resultStatus != null ? <DarkBox>

        <div className={[style.ResultBox,this.state.resultStatus=='error'?style.resultErro:'','childcenter','childcolumn','childcontentstart'].join(' ')}>
          <div className={style.TitleBox}>
            <div className={style.Tittleleft} />
            <div className={style.TittleValue}>{this.state.resultStatus=='success'?'回答正确':'回答错误'}</div>
            <div className={style.Tittleright} />
          </div>

          <div className={[style.ResultValue,'childcenter','childcolumn'].join(' ')}>
            <div>{this.state.resultStatus=='success'?'恭喜您':'很遗憾'}!</div>
            <div>{this.state.resultStatus=='success'?'回答正确':'回答错误'}</div>
          </div>
          
        </div>
        {/* <div className={[style.ReturnButton,'childcenter'].join(' ')} onClick={this.returnToSnatch}>
            返回
        </div> */}

      </DarkBox>:''}
        {this.state.data?<div
          className={[
            style.QuestionDetial,
            "childcenter",
            "childcolumn",
            "childcontentstart"
          ].join(" ")}>
          <div className={[style.AnswerTitle, "childcenter"].join(" ")}>
            <div className={[style.Title, "childcenter"].join(" ")}>
                {this.state.data.title}
            </div>
          </div>
          <div
            className={[style.AnswerBoxGroup, "childcenter childcontentstart"].join(
              " "
            )}>
            {this.createOption()}
          </div>
        </div>:''}
      </div>,
      <div
        className={[
          style.SubmitButton,
          this.state.selected == null ? style.unAct : "",
          "childcenter"
        ].join(" ")}
        onClick={this.state.selected == null ? "" : (this.state.onAjax?'':this.submit)}>
        提交
      </div>,
      // <div className={[style.UserScore,'childcenter','childcolumn'].join(' ')} style={{backgroundImage:'url('+ShortScroll+')'}}>
      //   你当前的得分为:999999999分
      // </div>
    ];
  }
}
AnswerQuestion.contextTypes = {
  
  SetAlertOption: PropTypes.func,
  HandleSnatchAnswerRoute: PropTypes.func,
  QuestionID: PropTypes.number,
  HandleCustomRoute:PropTypes.func
};
export default AnswerQuestion;
