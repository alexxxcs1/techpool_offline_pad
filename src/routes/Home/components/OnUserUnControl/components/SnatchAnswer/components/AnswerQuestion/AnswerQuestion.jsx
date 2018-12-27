import React, { Component } from "react";
import style from "./AnswerQuestion.scss";
import PropTypes from "prop-types";
import LongScroll from "assets/LongScroll.png";
import DarkBox from "components/DarkBox";

export class AnswerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
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
  refreshProps(props) {}
  SelectOption(index) {
    this.state.selected = index;
    this.setState(this.state);
  }
  submit() {
    if (this.state.selected!=null) {
        if(this.state.selected == 'A'){
            this.state.resultStatus = true;
        }else{
            this.state.resultStatus = false;
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

        <div className={[style.ResultBox,this.state.resultStatus==false?style.resultErro:'','childcenter','childcolumn','childcontentstart'].join(' ')}>
          <div className={style.TitleBox}>
            <div className={style.Tittleleft} />
            <div className={style.TittleValue}>{this.state.resultStatus==true?'回答正确':'回答错误'}</div>
            <div className={style.Tittleright} />
          </div>

          <div className={[style.ResultValue,'childcenter','childcolumn'].join(' ')}>
            <div>{this.state.resultStatus==true?'恭喜您':'很遗憾'}!</div>
            <div>{this.state.resultStatus==true?'回答正确':'回答错误'}</div>
          </div>
          
        </div>
        <div className={[style.ReturnButton,'childcenter'].join(' ')} onClick={this.returnToSnatch}>
            返回去抢答
        </div>

      </DarkBox>:''}
        <div
          className={[
            style.QuestionDetial,
            "childcenter",
            "childcolumn",
            "childcontentstart"
          ].join(" ")}>
          <div className={[style.AnswerTitle, "childcenter"].join(" ")}>
            <div className={[style.Title, "childcenter"].join(" ")}>
              RE-LY研究中对多少亚洲亚组人群进行了分析？
            </div>
          </div>
          <div
            className={[style.AnswerBoxGroup, "childcenter", "childstart"].join(
              " "
            )}>
            <div
              className={[
                style.OptionBox,
                this.state.selected == "A" ? style.ActOption : "",
                "childcenter"
              ].join(" ")}
              onClick={this.SelectOption.bind(this, "A")}>
              A. 2,782例
            </div>
            <div
              className={[
                style.OptionBox,
                this.state.selected == "B" ? style.ActOption : "",
                "childcenter"
              ].join(" ")}
              onClick={this.SelectOption.bind(this, "B")}>
              B. 2,782例
            </div>
            <div
              className={[
                style.OptionBox,
                this.state.selected == "C" ? style.ActOption : "",
                "childcenter"
              ].join(" ")}
              onClick={this.SelectOption.bind(this, "C")}>
              C. 2,782例
            </div>
            <div
              className={[
                style.OptionBox,
                this.state.selected == "D" ? style.ActOption : "",
                "childcenter"
              ].join(" ")}
              onClick={this.SelectOption.bind(this, "D")}>
              D. 2,782例
            </div>
          </div>
        </div>
      </div>,
      <div
        className={[
          style.SubmitButton,
          this.state.selected == null ? style.unAct : "",
          "childcenter"
        ].join(" ")}
        onClick={this.state.selected == null ? "" : this.submit}>
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
