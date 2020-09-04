const printSize = require('./../schema/printSize');

let express = require('express'),
    router = express.Router(),
    Category = require('../schema/categories'),
    Style = require('../schema/style'),
    PrintSize = require('./../schema/printSize')



    
router.post('/addCategory', (req, res) => {
    const request = req.body.data;
    const category = new Category({
        catID : request.catID,
        catType : request.catType,
    })
    category.save().then(result => {
        setTimeout(() => {
        const cat = Category.find({} , function(err, docs) {
            res.json(docs)
        })
        }, 1200);
    })
.catch(err => {
        console.log(err)
})
})


router.get('/getCategories', (req, res) => {
    const category = Category.find({} , function(err, docs) {
        res.json(docs)
    })
 
})

router.post('/editCategory', function (req, res) {
    const request = req.body.data;
  
    let query = {catID : request.catID}
    // console.log(req.body)
    Category.findOneAndUpdate(query , request, function(err, place) {
      if(err){
        return res
        .status(500)
        .send({error: "unsuccessful"})
      }
      const category = Category.find({} , function(err, docs) {
        res.json(docs)
    })
    })
})

router.post('/addStyle', (req, res) => {
    const request = req.body.data;
    // console.log
    const style = new Style({

        styleID : request.styleID,
        styleType :request.styleType
    })
    style.save().then(result => {
        setTimeout(() => {
        const styl = Style.find({} , function(err, docs) {
            res.json(docs)
        })
        }, 1200);
    })
.catch(err => {
        console.log(err)
})
})


router.get('/getStyles', (req, res) => {
    const style = Style.find({} , function(err, docs) {
        res.json(docs)
    })
 
})

router.post('/editStyle', function (req, res) {
    const request = req.body.data;
    
    let query = {styleID : request.styleID}
    // console.log(req.body)
    Style.findOneAndUpdate(query , request, function(err, place) {
      if(err){
        return res
        .status(500)
        .send({error: "unsuccessful"})
      }
      setTimeout(() => {
        const style = Style.find({} , function(err, docs) {
            res.json(docs)
        })
      }, 1200);
     
    })
})



router.post('/addprintSize', (req, res) => {
    const request = req.body.data;
    // console.log
    const printSize = new PrintSize({

        sizeID : request.sizeID,
        printSize :request.printSize
    })
    printSize.save().then(result => {
        setTimeout(() => {
        const printSize = PrintSize.find({} , function(err, docs) {
            res.json(docs)
        })
        }, 1200);
    })
.catch(err => {
        console.log(err)
})
})

router.get('/getprintSize', (req, res) => {
    const printsize = PrintSize.find({} , function(err, docs) {
        res.json(docs)
    })
 
})


router.post('/editprintSize', function (req, res) {
    const request = req.body.data;
    
    let query = {sizeID : request.sizeID}
    // console.log(req.body)
    Style.findOneAndUpdate(query , request, function(err, place) {
      if(err){
        return res
        .status(500)
        .send({error: "unsuccessful"})
      }
      setTimeout(() => {
        const printsize = PrintSize.find({} , function(err, docs) {
            res.json(docs)
        })
      }, 1200);
     
    })
})











module.exports = router;