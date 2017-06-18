const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
//var db = require('.\server\config\database.js');
let Article = require('mongoose').model('Article')
let Answers = require('mongoose').model('Answers')
let User = require('mongoose').model('User')
module.exports = {
    articlesGet: (req, res) => {
        res.render('article/article')
    },

    articlesPost: (req, res) => {
        let reqArticle = req.body
        Article.create({
            type: reqArticle.type,
            description: reqArticle.description,
            user: req.user._id,
            toBeEddited: reqArticle.toBeEddited,
            creationDate: reqArticle.creationDate,
            views: reqArticle.views,
            likes: reqArticle.likes,
            image: reqArticle.image,
            category:reqArticle.category

        }).then(Article, (err) => {

            if (err) {
                console.log('error')
            }
        })
        res.redirect('/articles/list/page/1')
    },

    articlesAll: (req, res) => {
        let id
        if (!req.hasOwnProperty("user")) {
            id = (ObjectId())
        }
        else {
            id = req.user._id
        }
 let role=req.user.roles[0]
        Article.updateMany({}, { $set: { "toBeEdited": false } }).then(o => {
            Article.updateMany({ user: id }, { $set: { "toBeEdited": true } }).then(o => {
                Article.find({})
                    .sort('creationDate')
                    .then(articles => {
                        articles.reverse()
                        let articlesLength = articles.length
                        let page = req.params.page
                        let dataToDisplay = []
                        let numberOfPages = []
                        let repeats = 10
                        if (articlesLength < 10) {
                            repeats = articlesLength
                        }
                        for (i = 0; i < repeats; i++) {
                            dataToDisplay.push(articles[(page * 10) - 10 + i])
                            if ((page * 10) - 10 + i == articlesLength - 1) {
                                break
                            }
                        }
                        for (n = 1; n <= Math.ceil(articlesLength / 10); n++) {
                            numberOfPages.push({ page: n })
                        }
                       
                        res.render('article/all-articles', {
                            articles: dataToDisplay,
                            numberOfPages: numberOfPages,
                           
                            
                        })
                    })
            })
        })

    },

    articleEdit: (req, res) => {
        Article.find({ _id: req.params.id }).then(extracted => {
            res.render('article/edit', {
                extracted: extracted
            })
        })
    },

    articleEdited: (req, res) => {
        let oldValue = req.params.type
        let newValue = req.body.newType
        Article.update({ type: oldValue }, { $set: { type: newValue } }).then(oi => {
            res.redirect('/articles/list/page/1')
        })
    },

    articleDetails: (req, res) => {
        let answers = Answers.find({ article: req.params.id })
        answers.sort('creationDate')
            .then(answers => {
                answers.reverse()
                Article.find({ _id: req.params.id }).then(extracted => {
                    let views = extracted[0].views + 1
                    Article.update({ _id: req.params.id }, { $set: { "views": views } }).then(views => {
                        let id
                        if (!req.hasOwnProperty("user")) {
                            id = (ObjectId())
                            res.render('article/details', {
                                extracted: extracted,
                                article: req.params.id,
                                answers: answers,
                                views: views,

                            })
                        }
                        else {
                            id = req.user._id
                            User.find({ _id: id }).then(user => {
                                let likedPosts = user[0].likedPosts
                                let currentArticle = req.params.id
                                let isLiked = false
                                for (i = 0; i < likedPosts.length; i++) {
                                    if (likedPosts[i] === currentArticle) {
                                        isLiked = true
                                        break
                                    }
                                }
                                res.render('article/details', {
                                    extracted: extracted,
                                    article: req.params.id,
                                    answers: answers,
                                    views: views,
                                    isLiked: isLiked
                                })
                            })
                        }


                    })

                })

            })  
    },

   


    addLike: (req, res) => {
        Article.find({ _id: req.params.article }).then(extracted => {
            let views = extracted[0].views - 1
            Article.update({ _id: req.params.article }, { $set: { "views": views } }).then(views => {
                Article.find({ _id: req.params.article }).then(extracted => {
                    let likes = extracted[0].likes + 1
                    Article.update({ _id: req.params.article }, { $set: { "likes": likes } }).then(o => {
                        User.find({ _id: req.user._id }).then(user => {
                            let postLikedToBeAdded = req.params.article
                            let likedPosts = user[0].likedPosts
                            likedPosts.push(postLikedToBeAdded)
                            User.update({ _id: req.user._id }, { $set: { "likedPosts": likedPosts } }).then(o => {
                                res.redirect('/articles/details/' + req.params.article)
                            })
                        })
                    })
                })
            })
        })
    },



    addDislike: (req, res) => {
        Article.find({ _id: req.params.article }).then(extracted => {
            let views = extracted[0].views - 1
            Article.update({ _id: req.params.article }, { $set: { "views": views } }).then(views => {
                Article.find({ _id: req.params.article }).then(extracted => {
                    let likes = extracted[0].likes - 1
                    Article.update({ _id: req.params.article }, { $set: { "likes": likes } }).then(o => {
                        User.find({ _id: req.user._id }).then(user => {
                            let postToBeUnliked = req.params.article
                            let likedPosts = user[0].likedPosts
                            console.log(likedPosts)
                            likedPosts = likedPosts.filter(val => val !== postToBeUnliked)
                            console.log(likedPosts)
                            User.update({ _id: req.user._id }, { $set: { "likedPosts": likedPosts } }).then(o => {
                                res.redirect('/articles/details/' + req.params.article)
                            })
                        })
                    })
                })
            })
        })
    }
}