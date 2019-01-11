import React, { Component } from 'react'
import PropTypes from "prop-types";

import {api} from 'common/app'

import style from './UserIndex.scss'
import LongScroll from 'assets/LongScroll.png'
import button from 'assets/button.png'
import tmp_headshot from 'assets/tmp_headshot.jpg'

  
export class UserIndex extends Component {
constructor(props) {
  super(props);
  this.state = {
    userinfo:null,
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.getUserInfo = this.getUserInfo.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.getUserInfo();
}
refreshProps(props) {
  
}
getUserInfo(){
    let sessionid = JSON.parse(window.localStorage.uinfo).sessionid;
    api.getUserInfo(sessionid).then(res=>{
        console.log(res);
        if (res.code == 200) {
            this.state.userinfo = res.result;
        }
        this.setState(this.state);
    },err=>{
        console.log(err);
        
    })
}
render() {
  return (
    <div className={[style.UserIndexBox,'childcenter','childcolumn'].join(' ')}>
        <div className={[style.PageTitle,'childcenter'].join(' ')} style={{backgroundImage:'url('+button+')'}}>
            个人中心
        </div>
        <div className={[style.InfoBox,'childcenter'].join(' ')} style={{backgroundImage:'url('+LongScroll+')'}}>
            {this.state.userinfo?<div className={[style.InfoDetial,'childcenter','childcolumn'].join(' ')}>
                <div className={style.HeadShot}>
                    <img src={this.state.userinfo.avatarUrl} alt=""/>
                </div>
                <div className={style.UserName}>{this.state.userinfo.username}</div>
                <div className={[style.UserTitle,'childcenter'].join(' ')}>{this.state.userinfo.scorename}</div>
                <div className={style.InfoBox}>
                    <div className={[style.BoxRow,'childcenter','childcontentstart'].join(' ')}>
                        个人数据 >>>
                    </div>
                    <div className={[style.InfoData,'childcenter','childcontentstart','childalignstart'].join(' ')}>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                            <div>{this.state.userinfo.regionid}</div>
                        </div>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                            <div>{this.state.userinfo.sex}</div>
                        </div>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                            <div>积分</div>
                            <div>{this.state.userinfo.count_score}分</div>
                        </div>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                            <div>个人排行</div>
                            <div>第{this.state.userinfo.totle_rank}名</div>
                        </div>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                            <div>七侠镇大区名</div>
                            <div>第{this.state.userinfo.region_rank}名</div>
                        </div>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}></div>
                    </div>
                </div>
            </div>:''}
        </div>
    </div>
   )
   }
}
UserIndex.contextTypes = {
    HandleCustomRoute: PropTypes.func,
};
export default UserIndex