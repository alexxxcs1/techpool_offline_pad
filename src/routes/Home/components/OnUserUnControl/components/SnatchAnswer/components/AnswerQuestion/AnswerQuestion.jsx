import React, { Component } from "react";
import style from "./AnswerQuestion.scss";
import PropTypes from "prop-types";
import LongScroll from "assets/LongScroll.png";
import DarkBox from "components/DarkBox";
import {api} from 'common/app'

export class AnswerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {A:false,B:false,C:false,D:false},
      resultStatus:null,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.SelectOption = this.SelectOption.bind(this);
    this.submit = this.submit.bind(this);
    this.returnToSnatch = this.returnToSnatch.bind(this);
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
    this.state.selected[index] = !this.state.selected[index];
    this.setState(this.state);
  }
  submit() {
    if (!(this.state.selected == null || !(this.state.selected['A']||this.state.selected['B']||this.state.selected['C']||this.state.selected['D']))) {
        let result = '';
        for (const key in this.state.selected) {
          if (this.state.selected[key]) {
            result = result+''+key
          }
        }
        if(result == this.state.data.question.success){
            api.snatchSubmitAnswer(JSON.parse(window.localStorage.uinfo).sessionid,this.state.data.question.id,result).then(res=>{
              if (res.code==200) {
                // this.state.resultStatus = true;
                // this.setState(this.state);
              }
            },err=>{
              console.log(err);
              
            })
            
        }else{
            api.snatchSubmitAnswer(JSON.parse(window.localStorage.uinfo).sessionid,this.state.data.question.id,result).then(res=>{
              if (res.code==200) {
                // this.state.resultStatus = false;
                // this.setState(this.state);
              }
            },err=>{
              console.log(err);
              
            })
        }
    }
    this.setState(this.state);
  }
  returnToSnatch(){
      this.context.HandleSnatchAnswerRoute(null);
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

        {/* 
        <div className={[style.ReturnButton,'childcenter'].join(' ')} onClick={this.returnToSnatch}>
            返回去抢答
        </div> 
        */}

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
              {this.state.data.question.title}
            </div>
          </div>
          <div
            className={[style.AnswerBoxGroup, "childcenter", "childcolumn"].join(
              " "
            )}>
            {this.state.data.question.check['D']?<div
              className={[
                style.OptionBox,
                this.state.selected['A']? style.ActOption : "",
                "childcenter childcontentstart"
              ].join(" ")}
              onClick={this.SelectOption.bind(this, "A")}>
              A.{this.state.data.question.check['A']}
            </div>:''}
            {this.state.data.question.check['D']?<div
              className={[
                style.OptionBox,
                this.state.selected['B']? style.ActOption : "",
                "childcenter childcontentstart"
              ].join(" ")}
              onClick={this.SelectOption.bind(this, "B")}>
              B. {this.state.data.question.check['B']}
            </div>:''}
            {this.state.data.question.check['D']?<div
              className={[
                style.OptionBox,
                this.state.selected['C']? style.ActOption : "",
                "childcenter childcontentstart"
              ].join(" ")}
              onClick={this.SelectOption.bind(this, "C")}>
              C. {this.state.data.question.check['C']}
            </div>:''}
            {this.state.data.question.check['D']?<div
              className={[
                style.OptionBox,
                this.state.selected['D']? style.ActOption : "",
                "childcenter childcontentstart"
              ].join(" ")}
              onClick={this.SelectOption.bind(this, "D")}>
              D. {this.state.data.question.check['D']}
            </div>:''}
          </div>
        </div>:''}
      </div>,
      <div
        className={[
          style.SubmitButton,
          (this.state.selected == null || !(this.state.selected['A']||this.state.selected['B']||this.state.selected['C']||this.state.selected['D']))? style.unAct : "",
          "childcenter"
        ].join(" ")}
        onClick={(this.state.selected == null || !(this.state.selected['A']||this.state.selected['B']||this.state.selected['C']||this.state.selected['D'])) ? "" : this.submit}>
        提交
      </div>
    ];
  }
}
AnswerQuestion.contextTypes = {
  SetAlertOption: PropTypes.func,
  HandleSnatchAnswerRoute: PropTypes.func,
  QuestionID: PropTypes.number
};
export default AnswerQuestion;
