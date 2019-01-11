import qs from 'qs';
const AskPost = (ajaxinstance) => {
    const customer = {}
    // customer.UserisLogin = () => {
    //     return ajaxinstance.post('login/isLogin',qs.stringify({

    //     }));
    //   }
    //判断用户是否登录（废弃）
    customer.UserisLogin = () => {
        return ajaxinstance.post('login/isLogin');
    }
    //用户登录ajax(获取sessionid,绑定在userhome中用websocket绑定)
    customer.UserLogin = (username, gonghao) => {
        return ajaxinstance.post('login/login', qs.stringify({
            username,
            gonghao
        }));
    }
    //评委打分ajax
    customer.RaterSetGrade = (pptid, judgeid, score) => {
        return ajaxinstance.post('judge/judgeScore', qs.stringify({
            pptid,
            judgeid,
            score
        }));
    }
    customer.getTotleRank = (sessionid) => {
        return ajaxinstance.post('user/getTotleRank', qs.stringify({
            sessionid
        }));
    }
    customer.getRegionRank = (sessionid) => {
        return ajaxinstance.post('user/getRegionRank', qs.stringify({
            sessionid
        }));
    }
    customer.getUserInfo = (sessionid) => {
        return ajaxinstance.post('user/index', qs.stringify({
            sessionid
        }));
    }

    //轮答答题
    customer.RotationQuestionAnswer = (lqid,sessionid,checkit) => {
        return ajaxinstance.post('user/questionsubimt', qs.stringify({
            lqid,sessionid,checkit
        }));
    }

    //抢答抢题目
    customer.snatch = (sessionid) => {
        return ajaxinstance.post('user/qiangda', qs.stringify({
            sessionid
        }));
    }
    //抢答提交题目
    customer.snatchSubmit = (qqid,num,sessionid) => {
        return ajaxinstance.post('user/qiangdaSubmit', qs.stringify({
            qqid,num,sessionid
        }));
    }
    //抢答提交答案
    customer.snatchSubmitAnswer = (sessionid,qqid,checkit) => {
        return ajaxinstance.post('user/qiangdaUserSave', qs.stringify({
            sessionid,qqid,checkit
        }));
    }
    
    

    




    return customer
}

export default AskPost