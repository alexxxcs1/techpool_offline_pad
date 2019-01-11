import React, { Component } from "react";
import style from "./SelectQuestion.scss";
import DarkBox from "components/DarkBox";
import LoadingBox from 'components/LoadingBox'
import PropTypes from "prop-types";
import {api} from 'common/app'

export class SelectQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      selectedid:null,
      questionlist:[],
      isSelected:false,
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
  refreshProps(props) {
    this.state.questionlist = props.data?props.data.list:this.state.questionlist;
    this.state.isSelected = props.data?(props.data.check?props.data.check.num:false):this.state.isSelected;
    // this.state.questionlist = props.snatchedQuestion;
    this.setState(this.state);
  }
  createQuestionButton() {
    let result = [];
    for (let z = 0; z < this.state.questionlist.length; z++) {
      result.push(
        <div
          onClick={this.state.questionlist[z].status==0?this.select.bind(this,this.state.questionlist[z].num,this.state.questionlist[z].id):()=>{}}
          className={[style.QuestionButton,this.state.selected == z?style.ActQuestionButton:'',this.state.questionlist[z].status!=0?style.CantSelect:'', "childcenter"].join(" ")}>
          <span>{this.state.questionlist[z].num}</span>{" "}
          <span>{this.state.questionlist[z].score}分</span>
        </div>
      );
    }
    return result;
  }
  select(index,id) {
    this.state.selected = index-1;
    this.state.selectedid = id;
    this.setState(this.state);
  }
  submit() {
    api.snatchSubmit(this.state.questionlist[this.state.selected].id,this.state.questionlist[this.state.selected].num,JSON.parse(window.localStorage.uinfo).sessionid).then(res=>{
      if (res.code == 200) {
        this.state.isSelected = res.num;
        this.setState(this.state);
      }
    },err=>{})
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
          {this.state.isSelected?<div className={[style.isSelectBox,'childcenter childcolumn'].join(' ')}>
          你已选择第{this.state.isSelected}题，请稍等
            <LoadingBox />
          </div>:[<div className={[style.SelectTitle, "childcenter"].join(" ")}>
            恭喜你，抢答成功！请选择题号
          </div>,
          <div
            className={[
              style.QuestionGroup,
              "childcenter",
              "childcontentstart"
            ].join(" ")}>
            {this.createQuestionButton()}
          </div>,
          <div
            className={[style.NextButton,this.state.selected!=null?'':style.unActButton, "childcenter"].join(" ")}
            onClick={this.state.selected!=null?this.submit:''}>
            提交
          </div>]}
        </div>
      </DarkBox>
    );
  }
}
SelectQuestion.contextTypes = {
    SetAlertOption: PropTypes.func,
};
export default SelectQuestion;
