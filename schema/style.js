const  mongoose  = require('mongoose')

const styleSchema = mongoose.Schema({
   styleID : {
        type: String,
       
    },
   styleType : {
        type: String,
       
    },

})


module.exports = Style = mongoose.model('styleSchema' , styleSchema);
