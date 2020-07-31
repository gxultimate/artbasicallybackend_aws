var mongoose = require('mongoose')

const connect = 'mongodb+srv://admin:admin@artbasically-duy9m.mongodb.net/test?retryWrites=true&w=majority'
const  connectDB =  async() => {
  await mongoose.connect(connect , {useUnifiedTopology : true , useNewUrlParser: true})
  console.log('db connected...')
}


module.exports = connectDB;