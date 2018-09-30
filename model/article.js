const mongoose = require('mongoose')
var Schema = mongoose.Schema;

// 文章保存接口
const article = new mongoose.Schema({
    title: String,
    content: String, // 富文本
    contentText: String, // 非富文本
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'category',
    },
    readnumber: {
        type: Number,
        default: 0
    },
    commonnum: {
        type: Number,
        default: 0
    }
},{versionKey: false, timestamps: {
    createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('article', article)