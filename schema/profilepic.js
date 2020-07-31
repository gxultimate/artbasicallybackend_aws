var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var profileImg = new Schema({
    img: { data: Buffer,
         contentType: String ,  id : String }
},
{
    timestamps: true
});
module.exports = mongoose.model('Profile', profileImg);