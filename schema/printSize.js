const  mongoose  = require('mongoose')

const printSizeSchema = mongoose.Schema({
   sizeID : {
        type: String,
       
    },
    printSize : {
        type: String,
       
    },

})


module.exports = PrintSize = mongoose.model('printSizeSchema' , printSizeSchema);