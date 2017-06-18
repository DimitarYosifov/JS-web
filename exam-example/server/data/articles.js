const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let articleSchema = new mongoose.Schema({
    user: { type: ObjectId, required: true, ref: 'User' },
    type: { type: String },
    description: { type: String },
    views: { type: Number, default: 1 },
    likes: { type: Number, default: 0 },
    toBeEdited: { type: Boolean, default: false },
    creationDate: { type: Date, default: Date.now() },
    image:{type:String},
    category:{type:String}
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article



