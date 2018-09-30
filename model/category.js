const mongoose = require('mongoose')

// 分类接口
const category = new mongoose.Schema({
    name: {
        type: String,
        unique: true // 唯一
        // required: true // 必须
    }
},{versionKey: false})

module.exports = mongoose.model('category', category)