const mongodb = require("mongodb")
let connection = 'mongodb://localhost:27017/testdb'
mongodb.MongoClient.connect(connection, (err, db) => {
    if (err) {
        console.log(err)
        return
    }

    let cats = db.collection("cats")

    // cats.insertMany([
    //    { "name": "petko", age: 4 },
    //     { "name": "kolio", age: 44 }
    //  ], (err, result) => {
    //     if (err) {
    //        console.log(err)
    //        return
    //     }
    //    console.log(result)
    // })

    cats.find({ "name": "kolio" }).toArray((err, data) => {
        console.log(data)
    })
})