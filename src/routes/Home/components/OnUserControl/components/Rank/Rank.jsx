import React, { Component } from "react";
import style from "./Rank.scss";
import {api} from 'common/app'

import button from "assets/button.png";
import LongScroll from "assets/LongScroll.png";
import tablehead from "assets/tablehead.png";
import tablechild from "assets/tablechild.png";

const name = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王"];
const city = ["城", "市", "镇", "村", "乡"];
const tittle = ["侠", "贼", "书生", "师", "优", "妓"];
export class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:[],
        tableStatus:'person',
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createTableChild = this.createTableChild.bind(this);
    this.ToggleTable = this.ToggleTable.bind(this);
    this.getPersonRank = this.getPersonRank.bind(this);
    this.getRegionRank = this.getRegionRank.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.getPersonRank();
  }
  getPersonRank(){
    let sessionid = JSON.parse(window.localStorage.uinfo).sessionid;
    api.getTotleRank(sessionid).then(res=>{
      console.log(res);
      if (res.code == 200) {
        this.state.data = res.result;
      }else{
        alert(res.message);
      }
      this.setState(this.state);
    },err=>{

    })
  }
  getRegionRank(){
    let sessionid = JSON.parse(window.localStorage.uinfo).sessionid;
    api.getRegionRank(sessionid).then(res=>{
      console.log(res);
      if (res.code == 200) {
        this.state.data = res.result;
      }else{
        alert(res.message);
      }
      this.setState(this.state);
    },err=>{

    })
  }
  createTableChild() {
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
      result.push(
        <div className={[style.TableRow, "childcenter"].join(" ")} style={{'--index':z}}>
          <div className={[style.TableColumn, "childcenter"].join(" ")} style={{width:'22%'}}>
            <div
              className={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              第{this.state.data[z].rank}名
            </div>
          </div>
          <div className={[style.TableColumn, "childcenter"].join(" ")} style={{width:'22%'}}>
            <div
              className={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {this.state.data[z].username}
            </div>
          </div>
          <div className={[style.TableColumn, "childcenter"].join(" ")} style={{width:'34%'}}>
            <div
              className={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {this.state.data[z].regionid}
            </div>
          </div>
          <div className={[style.TableColumn, "childcenter"].join(" ")} style={{width:'22%'}}>
            <div
              className={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {this.state.data[z].score}分
            </div>
          </div>
        </div>
      );
    }
    return result;
  }
  createRegionTableChild() {
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
      result.push(
        <div className={[style.TableRow, "childcenter"].join(" ")} style={{'--index':z}}>
          <div className={[style.TableColumn, "childcenter"].join(" ")}>
            <div
              className={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              第{this.state.data[z].rank}名
            </div>
          </div>
          <div className={[style.TableColumn, "childcenter"].join(" ")}>
            <div
              className={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {this.state.data[z].name}
            </div>
          </div>
          <div className={[style.TableColumn, "childcenter"].join(" ")}>
            <div
              className={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {this.state.data[z].score}分
            </div>
          </div>
        </div>
      );
    }
    return result;
  }
  ToggleTable(){
      this.state.tableStatus = this.state.tableStatus=='person'?'region':'person';
      this.state.data=[];
      this.state.tableStatus == 'person'?this.getPersonRank():this.getRegionRank();
      this.setState(this.state); 
  }
  refreshProps(props) {}
  render() {
    return (
      <div className={[style.RankBox, "childcenter", "childcolumn"].join(" ")}>
        <div
          className={[style.PageTitle, "childcenter"].join(" ")}
          style={{ backgroundImage: "url(" + button + ")" }}>
          {this.state.tableStatus == 'person'?'个人':'大区'}排行榜
        </div>
        <div
          className={[style.RankBox, "childcenter"].join(" ")}
          style={{ backgroundImage: "url(" + LongScroll + ")" }}>
          <div className={[style.RankDetial, "childcenter"].join(" ")}>

            {this.state.tableStatus == 'person' ?<div className={[style.Table,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                    <div className={[style.TableRow,'childcenter'].join(' ')}>

                        <div className={[style.TableColumn,'childcenter'].join(' ')} style={{width:'22%'}}>
                            <div className={[style.rowhead,'childcenter'].join(' ')} style={{backgroundImage:'url('+tablehead+')'}}>
                                排名
                            </div>
                        </div>
                        <div className={[style.TableColumn,'childcenter'].join(' ')} style={{width:'22%'}}>
                            <div className={[style.rowhead,'childcenter'].join(' ')} style={{backgroundImage:'url('+tablehead+')'}}>
                                姓名
                            </div>
                        </div>
                        <div className={[style.TableColumn,'childcenter'].join(' ')} style={{width:'34%'}}>
                            <div className={[style.rowhead,'childcenter'].join(' ')} style={{backgroundImage:'url('+tablehead+')'}}>
                                所属大区
                            </div>
                        </div>
                        <div className={[style.TableColumn,'childcenter'].join(' ')} style={{width:'22%'}}>
                            <div className={[style.rowhead,'childcenter'].join(' ')} style={{backgroundImage:'url('+tablehead+')'}}>
                                积分
                            </div>
                        </div>

                    </div>
                    <div className={style.TableBody}>
                    {this.createTableChild()}
                    </div>
                </div>:''}

            {this.state.tableStatus == 'region' ? <div
              className={[
                style.Table,
                "childcenter",
                "childcolumn",
                "childcontentstart"
              ].join(" ")}>
              <div className={[style.TableRow, "childcenter"].join(" ")}>
                <div className={[style.TableColumn, "childcenter"].join(" ")}>
                  <div
                    className={[style.rowhead, "childcenter"].join(" ")}
                    style={{ backgroundImage: "url(" + tablehead + ")" }}>
                    排名
                  </div>
                </div>
                <div className={[style.TableColumn, "childcenter"].join(" ")}>
                  <div
                    className={[style.rowhead, "childcenter"].join(" ")}
                    style={{ backgroundImage: "url(" + tablehead + ")" }}>
                    大区
                  </div>
                </div>
                <div className={[style.TableColumn, "childcenter"].join(" ")}>
                  <div
                    className={[style.rowhead, "childcenter"].join(" ")}
                    style={{ backgroundImage: "url(" + tablehead + ")" }}>
                    积分
                  </div>
                </div>
              </div>
              <div className={style.TableBody}>{this.createRegionTableChild()}</div>
            </div>:''}

          </div>
        </div>
        <div className={[style.ChangeButton, "childcenter"].join(" ")} onClick={this.ToggleTable}>
          切换{this.state.tableStatus == 'person'?'大区':'个人'}排行榜
        </div>
      </div>
    );
  }
}
export default Rank;
