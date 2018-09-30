var express = require('express')
var router = express.Router()
const articleModel = require('../model/article')
// const categoryModel = require('../model/article')

// 添加文章
router.post('/article', async (req, res, next) => {
    try{
        if(req.session.user){
            const {content, contentText, title, category} = req.body
            const data = await articleModel.
                create({
                    content, 
                    contentText, 
                    title, 
                    category,
                    author: req.session.user._id
                })
            
                res.json({
                    code: 200,
                    msg: '笔记发布成功',
                    data
                })
        } else{
            res.json({
                code: 403,
                msg: '未登录状态下不能发表笔记'
            })
        }    
    } catch(err) {
        next(err)
    }
})

//查询文章
router.get('/article', (req, res) => {

    let {pn=1, size=10} = req.query
    pn = parseInt(pn)
    size = parseInt(size)

    articleModel.find().skip((pn-1)*size).limit(size).sort({_id: -1})
    .populate({
        path: 'author',
        select: '-password -email'
    })
    .populate({
        path: 'category'
    })
    .then(data=>{
        res.json({
            code: 200,
            data
        })
    })
})


// 获取某一篇文章
router.get('/article/:id', (req, res) => {
    let {id} = req.params
    articleModel.findById(id)
    .populate({
        path: 'author',
        select: '-password -email'
    })
    .populate({
        path: 'category'
    }).then(data=>{
        res.json({
            code: 200,
            data
        })
    })
})

module.exports = router