const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
//var db = require('.\server\config\database.js');
let Answers = require('mongoose').model('Answers')
let Article = require('mongoose').model('Article')

module.exports = {
    addAnswer: (req, res) => {

        let reqAnswer = req.body
        Answers.create({
            article: req.params.article,
            text: reqAnswer.text,
            creationDate: reqAnswer.creationDate,
            creator: req.user._id

        }).then(o => {
            Article.find({ _id: req.params.article }).then(extracted => {
                let views = extracted[0].views - 1
                Article.update({ _id: req.params.article }, { $set: { "views": views } }).then(views => {
                }).then(o => {
                    res.redirect('/articles/details/' + req.params.article)
                })
            })
        })
    }
}