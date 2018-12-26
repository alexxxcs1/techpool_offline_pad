import React, { Component } from 'react'
import PropTypes from "prop-types";
import style from './UserIndex.scss'
import LongScroll from 'assets/LongScroll.png'
import button from 'assets/button.png'
import tmp_headshot from 'assets/tmp_headshot.jpg'

  
export class UserIndex extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
render() {
  return (
    <div className={[style.UserIndexBox,'childcenter','childcolumn'].join(' ')}>
        <div className={[style.PageTitle,'childcenter'].join(' ')} style={{backgroundImage:'url('+button+')'}}>
            个人中心
        </div>
        <div className={[style.InfoBox,'childcenter'].join(' ')} style={{backgroundImage:'url('+LongScroll+')'}}>
            <div className={[style.InfoDetial,'childcenter','childcolumn'].join(' ')}>
                <div className={style.HeadShot}>
                    <img src={tmp_headshot} alt=""/>
                </div>
                <div className={style.UserName}>白展堂</div>
                <div className={[style.UserTitle,'childcenter'].join(' ')}>盗中之圣</div>
                <div className={style.InfoBox}>
                    <div className={[style.BoxRow,'childcenter','childcontentstart'].join(' ')}>
                        个人数据 >>>
                    </div>
                    <div className={[style.InfoData,'childcenter','childcontentstart','childalignstart'].join(' ')}>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                            <div>七侠镇大区</div>
                        </div>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                            <div>男</div>
                        </div>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                            <div>积分</div>
                            <div>2000分</div>
                        </div>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                            <div>个人排行</div>
                            <div>第三名</div>
                        </div>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}>
                            <div>七侠镇大区名</div>
                            <div>第一名</div>
                        </div>
                        <div className={[style.DataBox,'childcenter','childcolumn','childcontentstart'].join(' ')}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   )
   }
}
UserIndex.contextTypes = {
    HandleCustomRoute: PropTypes.func,
};
export default UserIndex