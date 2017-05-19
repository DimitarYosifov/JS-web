const fs=require('fs')
let data={}

let put=(key,value)=>{

    if(typeof key !== 'string'){
        throw new Error('Key must be a string')
    }

    if(data.hasOwnProperty(key)){
         throw new Error('Key already exists')
    }

    data[key]=value;
    //console.log(data)
}

let get=(key)=>{
    if(typeof key !== 'string'){
        throw new Error('Key must be a string')
    }

    else if(!data.hasOwnProperty(key)){
        throw new Error("Key doesn't exist")
    }

    return data[key]

}

let update=(key,value)=>{
    if(typeof key !== 'string'){
        throw new Error('Key must be a string')
    }

    else if(!data.hasOwnProperty(key)){
        throw new Error("Key doesn't exist")
    }

     data[key]=value
}

let deleteItem=(key)=>{
if(typeof key !== 'string'){
        throw new Error('Key must be a string')
    }

    else if(!data.hasOwnProperty(key)){
        throw new Error("Key doesn't exist")
    }
    delete data[key]
}

let clear=()=>{
    data={}
}

let save=()=>{
    let dataToSting=JSON.stringify(data)
    fs.writeFileSync('storage.dat',dataToSting)
}

let load=()=>{
    let loadData=fs.readFileSync('storage.dat','utf8')
    data=JSON.parse(loadData)
}


module.exports={
put:put,
get:get,
update:update,
delete:deleteItem,
clear:clear,
save:save,
load:load
}