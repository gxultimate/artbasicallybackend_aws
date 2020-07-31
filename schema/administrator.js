const  mongoose  = require('mongoose')
// const ObjectID = mongoose.Schema.ObjectID;
const adminSchema = mongoose.Schema({
    acc_Emailaddress : {
        type: String,
        // required : true
    },
    acc_Fname: {
        type: String,
        // required : true
    },
    acc_Lname: {
        type: String,
        // required : true
    },
    acc_Suffix: {
        type: String,
        // required : true
    },
    acc_Birthday : {
        type: String,
        // required : true
    },
    accessType : {
        type: Array,
        // required : true
    }, 
    
 

})


module.exports = User = mongoose.model('adminSchema' , adminSchema);
