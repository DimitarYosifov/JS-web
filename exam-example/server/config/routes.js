const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
    app.get('/', controllers.home.index)
    app.get('/about', auth.isAuthenticated, controllers.home.about)//    auth.isInRole('Admin')  for admin
    app.get('/articles/add', controllers.article.articlesGet)
    app.get('/articles/list/page/:page', controllers.article.articlesAll)
    app.post('/articles', controllers.article.articlesPost)
    app.get('/articles/edit/:id', controllers.article.articleEdit)
    app.get('/articles/details/:id', controllers.article.articleDetails)
    app.post('/articles/edit/:type', controllers.article.articleEdited)
    app.post('/answers/add/:article', controllers.answers.addAnswer)
    app.get('/articles/like/:article', controllers.article.addLike)
    app.get('/articles/dislike/:article', controllers.article.addDislike)


    app.get('/users/register', controllers.users.registerGet)
    app.post('/users/register', controllers.users.registerPost)
    app.get('/users/login', controllers.users.loginGet)
    app.post('/users/login', controllers.users.loginPost)
    app.post('/users/logout', controllers.users.logout)
    app.get('/profile/:username', controllers.users.profile)

    app.all('*', (req, res) => {
        res.status(404)
        res.send('404 Not Found')
        res.end()
    })
}
