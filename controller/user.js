var express = require('express')
var router = express.Router()
const userModel = require('../model/user')

// 注册
router.post('/user', async (req,res) => {
    try{
        const {username, email, password} = req.body
        const userData = await userModel.findOne({email})

        const avatarNumber = Math.ceil(Math.random()*9)
        const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg`

        if(email == userData.email) {
            res.json({
                code: 400,
                msg: '该邮箱已被注册'
            })  

        }else{
            if (password && password.length>=6) {
                const data = await userModel.create({
                    username, email, password, avatar
                })
                res.json({
                    code: 200,
                    msg: '注册成功'
                })
            } else {
                throw '密码不得低于6位'
            }   
        }
        console.log(data)

    } catch(err) {
        res.json({
            code: 400,
            msg: '缺少必要参数',
            err
        })
    } 
})

// 登录
router.post('/login',async (req,res) => {
    try{
        const {email, password} = req.body
        const userData = await userModel.findOne({email})
        if(!userData){
            res.json({
                code: 400,
                msg: '用户不存在' 
            })
        }else{
            console.log(userData)
            if(password && password == userData.password){
                req.session.user = userData
                res.json({
                    code: 200,
                    msg: '登录成功',
                    userData: {
                        avatar: userData.avatar,
                        email: userData.email,
                        username: userData.username,
                        desc: userData.desc
                    }
                })
            }else{
                res.json({
                    code: 400,
                    msg: '密码不正确'
                })
            }
        }

    } catch(err){
        res.json({
            code: 400,
            msg: err
        })
    }
})

// 退出登录
router.get('/logout',(req,res)=>{
    if(req.session.user) { // 如果登陆状态存在
        req.session.user = null  
        res.json({
            code: 200,
            msg: '退出登录成功'
        })
    }else{
        res.json({
            code: 403,
            msg: '不能在未登录状态下退出登录'
        })
    }
})

module.exports = router;