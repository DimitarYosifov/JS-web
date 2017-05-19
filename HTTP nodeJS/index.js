const storage=require('./storage')


storage.put('first','some value')
storage.put('second','some ')

let someValue=storage.get('first')
console.log(someValue)

storage.update('first','another value')
let anotherValue=storage.get('first')
console.log(anotherValue)

//storage.delete("first")
//let someValue2=storage.get('first')

//storage.clear()
//let someValue2=storage.get('first')
//console.log(someValue2)
storage.save()

storage.clear()
storage.save()
storage.load()
let someValue2=storage.get('first')
console.log(someValue2)