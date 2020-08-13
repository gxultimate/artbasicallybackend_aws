var express = require('express');
var router = express.Router();
// var User = require("../schema/account")
// var Company = require('../schema/company')
// var Department = require('../schema/department')
// var Location = require('../schema/location')
// var Schedule = require('../schema/schedule')
// var Attendance = require('../schema/attendance')
// var Bulk = require('../schema/bulk')
var mongoose = require('mongoose')
var Schema = mongoose.schema

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/getCompany' , function(req , res) {
//   const companies = Company.find({} , function(err, docs) {
//       res.json(docs)
//   })
// })

// router.get('/getDepartments' , function(req , res) {
//   const department = Department.find({} , function(err, docs) {
//       res.json(docs)
//   })
// })

// router.get('/getLocation' , function(req , res) {
//   const location = Location.find({} , function(err, docs) {
//       res.json(docs)
//   })
// })

// router.get('/getSchedule' , function(req , res) {
//   const sched = Schedule.find({} , function(err, docs) {
//       res.json(docs)
//   })
// })

// router.get('/getAdmins' , function(req , res) {
//   const sched = User.find({} , function(err, docs) {
//     let admins  = docs.map(admin => {
//         if (admin.accessType !== 'Employee'){
//           return admin
//         }
//     })
//     console.log(admins)
//       res.json(admins)
//   })
// })

// router.get('/getEmployees' , function(req , res) {
//   const sched = User.find({} , function(err, docs) {
//     let employees  = docs.map(employee => {
//         if (employee.accessType !== 'Admin' || employee.accessType !== 'HR' || employee.accessType !== 'Payroll'){
//           return employee
//         }
//     })
//     console.log(employees)
//       res.json(employees)
//   })
// })

// router.post('/getBulkUpload' , function(req , res) {
//   const bulk = Bulk.find({} , function(err, docs) {
//     res.json(docs)
//   })
// })

// router.post('/addCompany', function (req, res) {
//   const request = req.body.data;
//   // console.log(req.body)
//   const company = new Company({
//     compName : request.compName,
//     compAddress : request.compAddress,
//     compEmail : request.compEmail,
//     compContact : request.compContact,
//     compTin : request.compTin,
//     compReg : request.compReg,
//     compContract : request.compContact,
//     compUsername : request.compUsername,
//     compPassword : request.compPassword,
//     compID : request.compID,
//     compType : request.compType,
//     compStatus : request.compStatus
//   })
//   company
//   .save()
//   .then(result => {
//     console.log(result)
//     res.json({message:'awtsuu'})
//   })
//   .catch(err => {
//     console.log(err)
//   })
//   // res.send('POST request to the homepage')
// })

// router.post('/editCompany', function (req, res) {
//   const request = req.body.data;
//   console.log(request)
//   let query = {compID : req.body.data.compID}
//   // console.log(req.body)
//   Company.findOneAndUpdate(query , request, {upsert : true, useFindAndModify : false}, function(err, place) {
//     if(err){
//       return res
//       .status(500)
//       .send({error: "unsuccessful"})
//     }
//     res.send({success:"success"})
//   })

//   // Company.findOneAndUpdate(query , request, {upsert: true}  ,{useFindAndModify : false}, function(err, place) {
//   //   if(err) return res.send(err);
//   //   return res.send('successfully Saved' , place)
//   // })

// })

// router.post('/addDepartment', function (req, res) {
//   const request = req.body.data;
//   //console.log(req.body)
//   const department = new Department({
//     dept_ID : request.dept_ID,
//     dept_Name : request.dept_Name,
//     dept_desc : request.dept_desc,
//     company_ID : request.company_ID
//   })
//   department
//   .save()
//   .then(result => {
//     console.log(result)
//     res.json({message:'awtsuu'})
//   })
//   .catch(err => {
//     console.log(err)
//   })
//   //res.send('POST request to the homepage')
// })

// router.post('/addLocation', function (req, res) {
//   const request = req.body.data;
//   // console.log(req.body)
//   const location = new Location({ 
//     locDesc : request.locationDesc,
//     locAddress : request.locAddress,
//   })
//   location
//   .save()
//   .then(result => {
//     console.log(result)
//     res.json({message:'awtsuu'})
//   })
//   .catch(err => {
//     console.log(err)
//   })
//   res.send('POST request to the homepage')
// })

// router.post('/addSchedule', function (req, res) {
//   const request = req.body.data;
//   console.log(request)
//   const schedule = new Schedule({
//     days : request.days,
//     first : request.first,
//     second : request.second,
//     schedName : request.schedName,
//     schedType : request.schedType,
//     compID : request.compID,
//     firstSched : request.firstSched,
//     secondSched : request.secondSched
//   })
//   schedule
//   .save()
//   .then(result => {
//     // console.log(result)
//     res.json({message:'awtsuu'})
//   })
//   .catch(err => {
//     console.log(err)
//   }) 
// })

// router.post('/editSchedule', function (req, res) {
//   const request = req.body.data;
//   console.log(request)
//   let query = {compID : req.body.data.compID}
//   // console.log(req.body)
//   Schedule.findOneAndUpdate(query , request, {upsert : true,useFindAndModify: false} , (err, place)=> {
//     if(err){
//       return res
//       .status(500)
//       .send({error: "unsuccessful"})
//     } 
//     res.send({success: "success"});
//   })
// })

// router.post('/addAttendance', function (req, res) {
//   const request = req.body.data;
//   console.log(request)
//   const atteendance = new Attendance({
//     empID: request.empID,
//     empFname: request.empFname,
//     empMname: request.empMname,
//     empLname: request.empLname,
//     empSuffix: request.empSuffix,
//     validatorPIN: request.validatorPIN,
//     timeStamp: request.timeStamp,
//     dateStamp : request.dateStamp ,
//     firstTimeIn : request.firstTimeIn ,
//     firstTimeOut : request.firstTimeOut ,
//     secondTimeIn: request.secondTimeIn,
//     secondTimeOut : request.secondTimeOut ,
//     overTime : request.overTime ,
//     absences : request.absences ,
//     tardiness : request.tardiness ,
//   })
//   atteendance
//   .save()
//   .then(result => {
//     // console.log(result)
//     res.json({message:'awtsuu'})
//   })
//   .catch(err => {
//     console.log(err)
//   }) 
// })

// router.post('/addAdmin', function (req, res) {
//   const request = req.body.data;
//   console.log(request)
//   const user = new User({
//     empFname: request.empFname,
//     empMname: request.empMname,
//     empLname: request.empLname,
//     empSuffix: request.empSuffix,
//     empAddress: request.empAddress,
//     empEmailAddress: request.empEmailAddress,
//     empBirthday: request.empBirthday,
//     empGender : request.empGender ,
//     empCivilStatus : request.empCivilStatus ,
//     empReligion : request.empReligion ,
//     accessType: request.accessType,
//     empContactNumber : request.empContactNumber ,
//     empGovernmentID : request.empGovernmentID ,
//     empStatus : request.empStatus ,
//     empPosition : request.empPosition ,
//     dateRegistered : request.dateRegistered ,
//     empCompanyID : request.empCompanyID,
//     empDepartment : request.empDepartment,
//     username : request.username ,
//     password : request.password ,
//   })
//   user
//   .save()
//   .then(result => {
//     // console.log(result)
//     res.json({message:'awtsuu'})
//   })
//   .catch(err => {
//     console.log(err)
//   }) 
// })

// router.post('/fileUpload', function (req, res) {
//   let request = req.body.data;
//   let sample = request.data.map((data, index)=> {
//     new Bulk({'request':data , 
//     compID : request.compID
//   })
//   .save()
//   .then(result => {
//     res.json({message:'awtsuu'})
//   })
//   .catch(err => {
//     console.log(err)
//   })
//   })
//   console.log(sample)
 
//   // const testCollectionSchema = new Schema({}, { strict: false })
//   //   const TestCollection = mongoose.model('test_collection', testCollectionSchema)
//   //   let body = req.body
//   //   const testCollectionData = new TestCollection(request)
//   //   await testCollectionData.save()
//   //   return res.send({
//   //     "msg": "Data Saved Successfully"
//   //   })
// })

// router.post('/addEmployee', function (req, res) {
//   const request = req.body.data;
//   console.log(request)
//   const user = new User({
//     empFname: request.empFname,
//     empMname: request.empMname,
//     empLname: request.empLname,
//     empSuffix: request.empSuffix,
//     empAddress: request.empAddress,
//     empEmailAddress: request.empEmailAddress,
//     empBirthday: request.empBirthday,
//     empGender : request.empGender ,
//     empCivilStatus : request.empCivilStatus ,
//     empReligion : request.empReligion ,
//     accessType: request.accessType,
//     empContactNumber : request.empContactNumber ,
//     empGovernmentID : request.empGovernmentID ,
//     empStatus : request.empStatus ,
//     empPosition : request.empPosition ,
//     dateRegistered : request.dateRegistered ,
//     empCompanyID : request.empCompanyID,
//     empDepartment : request.empDepartment,
//     username : request.username ,
//     password : request.password ,
//   })
//   user
//   .save()
//   .then(result => {
//     // console.log(result)
//     res.json({message:'awtsuu'})
//   })
//   .catch(err => {
//     console.log(err)
//   }) 
// })

// router.post('/loginCompany', function (req, res) {
//   const request = req.body.data;
//   const companyList = Company.findOne({'compUsername': request.compUsername , 'compPassword' : request.compPassword})
//   companyList.exec(function (err , docs){
//     if (err || docs === null){
//       res.send(false)
//     }
//     else{
//       res.json(docs)
//     }
//   })  
// })

// router.post('/loginAdmin', function (req, res) {
//     const request = req.body.data;
//     const adminList = User.findOne({'username': request.username , 'password' : request.password})
//     console.log(request)
//     adminList.exec(function (err , docs){
//       if (err || docs === null){
//         res.send(false)
//       }
//       else{
//         res.json(docs)
//       }
//     })  
// })

// router.post('/loginEmployee', function (req, res) {
//   const request = req.body.data;
 
//   const userList = User.findOne({'username': request.username , 'password': request.password})
//   userList.exec(function (err , docs){
//     if (err || docs === null){
//       res.send(false)
//     }
//     else{
//       res.json(docs)
//     }
//   })  
// })

  // const request = req.body.data;

//   // console.log(req.body)
//   const user = new User({
//     username : request.email,
//     password : request.password,
//   })
//   user
//   .save()
//   .then(result => {
//     // console.log(result)
//     res.json({message:'awtsuu'})
//   })
//   .catch(err => {
//     console.log(err)
//   }) 
//   // res.send('POST request to the homepage')

// router.post('/login', function (req, res) {
//   const request = req.body.data;
//   // console.log(req.body)
//   const user = new User({
//     username : request.email,
//     password : request.password,
//   })
//   user
//   .save()
//   .then(result => {
//     // console.log(result)
//     res.json({message:'awtsuu'})
//   })
//   .catch(err => {
//     console.log(err)
//   })
//   // res.send('POST request to the homepage')
// })  

  // const useer = User.find({}, function (err, docs) {
  //     console.log(docs)
  // } )

module.exports = router;
