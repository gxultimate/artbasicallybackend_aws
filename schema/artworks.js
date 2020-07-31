const  mongoose  = require('mongoose')
// const ObjectID = mongoose.Schema.ObjectID;
const artworksSchema = mongoose.Schema({
    artworkID : {
        type: String,
        
    },
    artName : {
        type: String,
        
    },
    artDescription : {
        type: String,
        
    },
    artStyle : {
        type: Array,
        
    },
    artTheme : {
        type: Array,
        
    },
    artPrice : {
        type: String,
        
    },
    artSize: {
        type : Array
    },
    artRating : {
        type: String,
        
    },
    accID : {
        type : String
    },
    artistName : {
        type : String
    },
    artworkDateCreated : {
        type : String
    },
    artDimension: {
        type : String
    },
    artType: {
        type : String
    },
    artCategory : {
        type: Array
    },
    artworkImg :{
        type: String
    },
    dateAdded: {
        type : String
    },
    artworkStatus : {
        type : String
    }
})


module.exports = artworks = mongoose.model('artworksSchema' , artworksSchema);

