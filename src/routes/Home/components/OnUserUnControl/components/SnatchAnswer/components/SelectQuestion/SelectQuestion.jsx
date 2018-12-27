import React, { Component } from "react";
import style from "./SelectQuestion.scss";
import DarkBox from "components/DarkBox";
import PropTypes from "prop-types";

export class SelectQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createQuestionButton = this.createQuestionButton.bind(this);
    this.submit = this.submit.bind(this);
    this.select = this.select.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  createQuestionButton() {
    let result = [];
    for (let z = 0; z < 10; z++) {
      result.push(
        <div
          onClick={this.select.bind(this,z)}
          className={[style.QuestionButton,this.state.selected == z?style.ActQuestionButton:'', "childcenter"].join(" ")}>
          <span>{z + 1}</span>{" "}
          <span>{z + 1}分</span>
        </div>
      );
    }
    return result;
  }
  select(index) {
    this.state.selected = index;
    this.setState(this.state);
  }
  submit() {
    if(this.state.selected==null){
        
    }else{
        this.props.callback(this.state.selected);
    }
    
  }
  render() {
    return (
      <DarkBox>
        <div
          className={[
            style.SelectQuestionBox,
            "childcenter",
            "childcolumn"
          ].join(" ")}>
          <div className={[style.SelectTitle, "childcenter"].join(" ")}>
            恭喜你，抢答成功！请选择题号
          </div>
          <div
            className={[
              style.QuestionGroup,
              "childcenter",
              "childcontentstart"
            ].join(" ")}>
            {this.createQuestionButton()}
          </div>
          <div
            className={[style.NextButton,this.state.selected?'':style.unActButton, "childcenter"].join(" ")}
            onClick={this.state.selected?this.submit:''}>
            提交
          </div>
        </div>
      </DarkBox>
    );
  }
}
SelectQuestion.contextTypes = {
    SetAlertOption: PropTypes.func,
};
export default SelectQuestion;
