let data = []
let n =10


module.exports = {
    save: (image) => {
        data.push(image)

            //console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
       // console.log(data)
    },



    get: ()=>{
        
        return data
    }
}