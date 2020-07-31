var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var photoSchema = new Schema({
    img: { data: Buffer,
         contentType: String ,  id : Array,}
},
{
    timestamps: true
});
module.exports = mongoose.model('Img', photoSchema);