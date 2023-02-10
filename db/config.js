const mongoose =require('mongoose')


const connect =async(url)=>{

    await mongoose.connect(url,{});
}
module.exports=connect;
