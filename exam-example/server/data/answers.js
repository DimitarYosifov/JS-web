const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let answersSchema = new mongoose.Schema({
    article: { type: ObjectId, required: true, ref: 'article' },
    creator:{type: ObjectId, required: true, ref: 'User'},
    text: { type: String },
    creationDate:{type:Date ,default:Date.now()}
})

let Answers = mongoose.model('Answers', answersSchema)

module.exports = Answers



