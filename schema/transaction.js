const  mongoose  = require('mongoose')

const transactionSchema = mongoose.Schema({
    orderID : {
        type: String
    },
    accID : {
        type: String,
       
    },
    accFname : {
        type: String,
       
    },
    accLname : {
        type: String,
      
    },
    accSuffix : {
        type: String,
      
    },
    accAddress : {
        type: String,
      
    },
    accEmailAddress : {
        type: String,
      
    },
    artistName : {
        type: String
    },
    artistID : {
        type  : String
    },
    artworkName : {
        type: String
    },
    dateOfTransaction : {
        type : String
    },
    artworkSize : {
        type : String
    },
    artworkPaymentAmount: {
        type: String
    },
    artworkPrice: {
        type: String
    },
    modeOfPayment : {
        type: String,
        required : true
    },
    orderDate : {
        type: String,
        required : true
    },
    orderStatus : {
        type: String,
        required : true
    },


})


module.exports = Transaction = mongoose.model('transactionSchema' , transactionSchema);
