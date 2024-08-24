const mongoose=require('mongoose');

const mongoDb=(() => mongoose.connect(process.env.ATLAS_KEY).then(()=>{
    console.log('database connected!');
}).catch((err)=>{
    console.log(err);
}));

module.exports = mongoDb;