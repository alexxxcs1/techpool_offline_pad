import React, { Component } from "react";
import style from "./Rank.scss";

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
        tableStatus:'person',
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createTableChild = this.createTableChild.bind(this);
    this.ToggleTable = this.ToggleTable.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  createTableChild() {
    let result = [];
    for (let z = 0; z < 30; z++) {
      result.push(
        <div class={[style.TableRow, "childcenter"].join(" ")}>
          <div class={[style.TableColumn, "childcenter"].join(" ")}>
            <div
              class={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              第{(z + 1).toLocaleString("zh-CN-u-nu-hanidec")}名
            </div>
          </div>
          <div class={[style.TableColumn, "childcenter"].join(" ")}>
            <div
              class={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {name[Math.floor(Math.random() * name.length)]}
              {Math.floor(Math.random() * 9 + 1).toLocaleString(
                "zh-CN-u-nu-hanidec"
              )}
            </div>
          </div>
          <div class={[style.TableColumn, "childcenter"].join(" ")}>
            <div
              class={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {Math.floor(Math.random() * 9 + 1).toLocaleString(
                "zh-CN-u-nu-hanidec"
              )}
              {tittle[Math.floor(Math.random() * tittle.length)]}
              {city[Math.floor(Math.random() * city.length)]}大区
            </div>
          </div>
          <div class={[style.TableColumn, "childcenter"].join(" ")}>
            <div
              class={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {50000 - z * 10}分
            </div>
          </div>
        </div>
      );
    }
    return result;
  }
  createRegionTableChild() {
    let result = [];
    for (let z = 0; z < 30; z++) {
      result.push(
        <div class={[style.TableRow, "childcenter"].join(" ")}>
          <div class={[style.TableColumn, "childcenter"].join(" ")}>
            <div
              class={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              第{(z + 1).toLocaleString("zh-CN-u-nu-hanidec")}名
            </div>
          </div>
          <div class={[style.TableColumn, "childcenter"].join(" ")}>
            <div
              class={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {Math.floor(Math.random() * 9 + 1).toLocaleString(
                "zh-CN-u-nu-hanidec"
              )}
              {tittle[Math.floor(Math.random() * tittle.length)]}
              {city[Math.floor(Math.random() * city.length)]}大区
            </div>
          </div>
          <div class={[style.TableColumn, "childcenter"].join(" ")}>
            <div
              class={[style.rowchild, "childcenter"].join(" ")}
              style={{ backgroundImage: "url(" + tablechild + ")" }}>
              {50000 - z * 10}分
            </div>
          </div>
        </div>
      );
    }
    return result;
  }
  ToggleTable(){
      this.state.tableStatus = this.state.tableStatus=='person'?'region':'person';
      this.setState(this.state); 
  }
  refreshProps(props) {}
  render() {
    return (
      <div class={[style.RankBox, "childcenter", "childcolumn"].join(" ")}>
        <div
          className={[style.PageTitle, "childcenter"].join(" ")}
          style={{ backgroundImage: "url(" + button + ")" }}>
          {this.state.tableStatus == 'person'?'个人':'大区'}排行榜
        </div>
        <div
          className={[style.RankBox, "childcenter"].join(" ")}
          style={{ backgroundImage: "url(" + LongScroll + ")" }}>
          <div class={[style.RankDetial, "childcenter"].join(" ")}>

            {this.state.tableStatus == 'person' ?<div class={[style.Table,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                    <div class={[style.TableRow,'childcenter'].join(' ')}>

                        <div class={[style.TableColumn,'childcenter'].join(' ')} >
                            <div class={[style.rowhead,'childcenter'].join(' ')} style={{backgroundImage:'url('+tablehead+')'}}>
                                排名
                            </div>
                        </div>
                        <div class={[style.TableColumn,'childcenter'].join(' ')} >
                            <div class={[style.rowhead,'childcenter'].join(' ')} style={{backgroundImage:'url('+tablehead+')'}}>
                                姓名
                            </div>
                        </div>
                        <div class={[style.TableColumn,'childcenter'].join(' ')} >
                            <div class={[style.rowhead,'childcenter'].join(' ')} style={{backgroundImage:'url('+tablehead+')'}}>
                                所属大区
                            </div>
                        </div>
                        <div class={[style.TableColumn,'childcenter'].join(' ')} >
                            <div class={[style.rowhead,'childcenter'].join(' ')} style={{backgroundImage:'url('+tablehead+')'}}>
                                积分
                            </div>
                        </div>

                    </div>
                    <div class={style.TableBody}>
                    {this.createTableChild()}
                    </div>
                </div>:''}

            {this.state.tableStatus == 'region' ? <div
              class={[
                style.Table,
                "childcenter",
                "childcolumn",
                "childcontentstart"
              ].join(" ")}>
              <div class={[style.TableRow, "childcenter"].join(" ")}>
                <div class={[style.TableColumn, "childcenter"].join(" ")}>
                  <div
                    class={[style.rowhead, "childcenter"].join(" ")}
                    style={{ backgroundImage: "url(" + tablehead + ")" }}>
                    排名
                  </div>
                </div>
                <div class={[style.TableColumn, "childcenter"].join(" ")}>
                  <div
                    class={[style.rowhead, "childcenter"].join(" ")}
                    style={{ backgroundImage: "url(" + tablehead + ")" }}>
                    大区
                  </div>
                </div>
                <div class={[style.TableColumn, "childcenter"].join(" ")}>
                  <div
                    class={[style.rowhead, "childcenter"].join(" ")}
                    style={{ backgroundImage: "url(" + tablehead + ")" }}>
                    积分
                  </div>
                </div>
              </div>
              <div class={style.TableBody}>{this.createRegionTableChild()}</div>
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
