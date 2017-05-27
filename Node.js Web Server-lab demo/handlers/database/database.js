let data = []

module.exports = {

    save: (image) => {
        data.push(image)
    },

    get: ()=>{
        return data
    }
    
}