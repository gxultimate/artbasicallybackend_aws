const  mongoose  = require('mongoose')
// const ObjectID = mongoose.Schema.ObjectID;
const ordersSchema = mongoose.Schema({
    orderID : {
        type: String,
        required : true
    },
    accID : {
        type: String,
        required: true
    },
    modeOfPayment : {
        type: String,
        required : true
    },
    orderDate : {
        type: String,
        required : true
    },
    orderItems : {
        type: Array,
        required: true
    },
    orderStatus : {
        type: String,
        required : true
    },
    paymentStatus : {
        type: String,
        required : true
    }
})


module.exports = order = mongoose.model('ordersSchema' , ordersSchema);