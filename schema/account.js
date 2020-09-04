const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    accID: {
        type: String,

    },
    accFname: {
        type: String,

    },
    accLname: {
        type: String,

    },
    accSuffix: {
        type: String,

    },
    accAddress: {
        type: String,

    },
    accEmailAddress: {
        type: String,

    },
    accessType: {
        type: String,

    },
    accInstitution: {
        type: String,

    },
    accFollowers: {
        type: Array,

    },
    accPoints: {
        type: String,

    },
    password: {
        type: String,

    },
    username: {
        type: String,

    },
    birthYear: {
        type: String
    },
    accContact: {
        type: String
    },
    accCategories: {
        type: Array
    },
    accStyles: {
        type: Array
    },
    password: {
        type: String
    },
    artistDescription: {
        type: String
    },
    profile_Img: {
        type: String
    },
    dateAdded: {
        type: String
    },
    acc_Status : {
        type: String
    },
    acc_Documents : {
        type: String
    }
})


module.exports = User = mongoose.model('userSchema', userSchema);
