var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Cart = require('../models/cartX');
var Cart2 = require('../models/cart2');
var Category = require('../models/category');
var nodemailer = require('nodemailer');
var Product = require('../models/product');
var Order = require('../models/order');
var PStats = require('../models/productStats');
var CStats = require('../models/categoryStats');
var TStats = require('../models/typeStats');
var Order2 = require('../models/order2');
var Make = require('../models/make');
var Models = require('../models/models');
var xlsx = require('xlsx')
var multer = require('multer')
const fs = require('fs')
var path = require('path');
var passport = require('passport');
var moment = require('moment')
/*const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;*/
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";
/*const connectEnsureLogin = require('connect-ensure-login')*/


var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})



var upload = multer({
    storage:storage
})








router.get('/', function (req, res, next) {
  var messages = req.flash('error');
  
  res.render('login', { messages: messages, hasErrors: messages.length > 0});
});
router.post('/', passport.authenticate('local.signin', {
  failureRedirect: '/',
  failureFlash: true
}), function (req, res, next) {
  if(req.user.role == "admin"){
    res.redirect("/orderVI");
  }else{
      res.redirect('/')
  }
  
});





router.get("/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
});

  
  
//

router.get('/orderVI',isLoggedIn, function(req,res){
    let ord6 =[]
    var id = req.user._id
    User.find({_id:id},  function(err,nocs){
   
  let num = nocs[0].num
    
  
    Order.find({},function(err,docs){
  var size = docs.length - 1
  
  let cart=[]
     let cart2=[]
     let prop = []
      for(var i = 0; i<docs.length;i++){
     
  
  
  
  
    // cart.push(docs[i].cart)
     //console.log(cart.length)
    
  
     cart2.push(docs[i].cart)
    
     if(i == size){
      console.log(cart2.length, 'cart length')
     for(var x=0;x<cart2.length;x++){
       
       let properties = Object.keys(cart2[x].items);
       //console.log(properties.length,'properties length'+ x)
       //console.log(properties,'properties'+ x)
  let sz = properties.length - 1
      for(var c = 0; c<properties.length;c++){
        prop.push(properties[c])
        //console.log(properties[c])
        if(c == sz){
         // console.log(properties[c])
         // prop.push(properties[c])
  //console.log(properties +'index'+ x)
  //console.log(prop,'prop')
  //console.log(prop.length)
  //console.log(prop.length,'outta loop')
  //console.log(prop,'prop')
  //console.log(prop.length,'prop length')
  
  let psize= Object.keys(cart2[x].items)
  //psize.push(Object.keys(cart2[x].items))
  //console.log(psize.length,'psize length')
  let psizeX = psize.length
  
  
  
  
  let count = -1
  for(num;num<prop.length;num++){
  count++
  //console.log(num,'n')
  //console.log(count, 'count')
  
  if(count <=psizeX){
  
    ord6.push(cart2[x].items[prop[num]])
    //console.log(x+'x'+ 'n'+ num)
  
   //console.log(cart2[x].items[prop[n]],'zvinobuda')
   User.findByIdAndUpdate(id,{$set:{num:num}},  function(err,docs){
   
  
   })
   
  }
  else if (count>psizeX){
  break;
  
  }
   
    
   //console.log(count,'count')
   // console.log(cart2[x].items[prop[n]],'zvafa'+ n)
   // console.log(cart2[x].items[prop[n]],'zvafa'+ n)
  // ord6.push(cart2[x].items[prop[n]])
   //console.log(cart2[x].items[prop[x]].item)
   
  }
  
  
  }
  
  //console.log(cart2[x].items[prop[c]],'zvafa'+ x)
      }
  
  //
     }
     //console.log(ord6.length, 'length')
     //console.log(ord6)
     console.log(ord6.length,'length')
   
     for(var q=0;q<ord6.length;q++){
    
    
    let ord = new Order2()
    
    ord.name = ord6[q].item.name
    ord.category = ord6[q].item.category
    ord.type = ord6[q].item.type
    ord.id = ord6[q].item._id
    ord.price = ord6[q].price

    ord.qty = ord6[q].qty

    ord.save()
  
     }
   
     
  }
  
      }
  
  
  
      res.redirect('/user')
    })
   
  })
  
  })
  
  router.get('/user',isLoggedIn,function(req,res){
    var id = req.user._id
    Order2.find({},function(err,nocs){
     console.log(nocs.length,'size'+'user')
        let size = nocs.length
    User.findByIdAndUpdate(id,{$set:{num:size}},function(err,doc){
if(!err){
  res.redirect('/pstats')
}
})
      
    })
 
  })
  
  router.get('/pstats',isLoggedIn,function(req,res){
    Order2.find({},function(err,docs){
      for(var i = 0; i<docs.length;i++){
        let id = docs[i].id;
        let name= docs[i].name
        let category = docs[i].category
       
        let type = docs[i].type
  
        
       
          PStats.find({id:id},function(err,tocs){
          let size = tocs.length
       
          if(tocs == 0){
            let ord = new PStats()
  
            ord.name =name
            ord.id =id
            ord.qty = 0
            ord.category = category
           
            ord.type= type
            ord.save()
  
          }
         
  
        })
     
      }
      res.redirect('/pup')
    })
  })
  
  
      
  router.get('/pup',function(req,res){
    PStats.find({},function(err,docs){
      for(var i = 0;i<docs.length;i++){
        let id = docs[i].id
        PStats.find({id:id},function(err,nocs){
          if(nocs.length > 1){
            PStats.findByIdAndRemove(nocs[1]._id, function(err,tocs){
  
            })
          }
        })
      }
      res.redirect('/pstats2')
    })
  })
  
  
  
  
  
  router.get('/pstats2',function(req,res){
   
    Order2.find({},function(err,docs){
      for(var i = 0; i<docs.length;i++){
        let name = docs[i].name
        let id = docs[i].id
  
        Order2.find({ id:id},function(err,tocs){
          let arr=[]
          for(var c = 0;c<tocs.length; c++){
            arr.push(tocs[c].qty)
              }
         let total=0;
          for(var c in arr) { total += arr[c]; }
        
          //subtracting total income from amount owing
         console.log(total,'total',id)
  
  
         PStats.find({id:id},function(err,locs){
  console.log(id,'id')
          if(locs.length >= 1){
            let id2 = locs[0]._id
            PStats.findByIdAndUpdate(id2,{$set:{qty:total}},function(err,kocs){
  
            })
          }
  
  
  
         })
        })
       
      }
      res.redirect('/cstats')
    })
  })
  
  
  
  
  
  router.get('/cstats',isLoggedIn,function(req,res){
    Order2.find({},function(err,docs){
      for(var i = 0; i<docs.length;i++){
        let id = docs[i].id;
        let name= docs[i].name
        let category = docs[i].category
  
        let type = docs[i].type
  
        
       
          CStats.find({category:category},function(err,tocs){
          let size = tocs.length
       
          if(tocs.length == 0){
            let ord = new CStats()
  
          
           
            ord.qty = 0
            ord.category = category
        
            ord.type= type
            ord.save()
  
          }
         
  
        })
      
      }
      res.redirect('/cup')
    })
  })
  
  
  
      
  router.get('/cup',function(req,res){
    CStats.find({},function(err,docs){
      for(var i = 0;i<docs.length;i++){
        let category = docs[i].category
        CStats.find({category:category},function(err,nocs){
          if(nocs.length > 1){
            for(var a = 1;a<nocs.length;a++){
            CStats.findByIdAndRemove(nocs[a]._id, function(err,tocs){
  
            })
          }
          }
        })
      }
      res.redirect('/cstats2')
    })
  })
  
  
  
  
  
  router.get('/cstats2',function(req,res){
   
    Order2.find({},function(err,docs){
      for(var i = 0; i<docs.length;i++){
 
        let category = docs[i].category
  
        Order2.find({category:category},function(err,tocs){
          let arr=[]
          for(var c = 0;c<tocs.length; c++){
            arr.push(tocs[c].qty)
              }
         let total=0;
          for(var c in arr) { total += arr[c]; }
        
          //subtracting total income from amount owing
         console.log(total,'total')
  
  
         CStats.find({category:category},function(err,locs){
  
          if(locs){
            let id2 = locs[0]._id
            CStats.findByIdAndUpdate(id2,{$set:{qty:total}},function(err,kocs){
  
            })
          }
  
  
  
         })
        })
   
      }
      res.redirect('/tstats')
    })
  })
  
  
  
  router.get('/tstats',isLoggedIn,function(req,res){
    Order2.find({},function(err,docs){
      for(var i = 0; i<docs.length;i++){
        let id = docs[i].id;
        let name= docs[i].name
        let category = docs[i].category

        let type = docs[i].type
  
        
       
          TStats.find({type:type},function(err,tocs){
          let size = tocs.length
       
          if(tocs.length == 0){
            let ord = new TStats()
  
          
           
            ord.qty = 0
            ord.category = category
         
            ord.type= type
            ord.save()
  
          }
         
  
        })
       
      }
      res.redirect('/tup')
    })
  })
  
  
  router.get('/tup',function(req,res){
    TStats.find({},function(err,docs){
      for(var i = 0;i<docs.length;i++){
        let type = docs[i].type
        TStats.find({type:type},function(err,nocs){
          if(nocs.length > 1){
            for(var a = 1;a<nocs.length;a++){
            TStats.findByIdAndRemove(nocs[a]._id, function(err,tocs){
  
            })
          }
          }
        })
      }
      res.redirect('/tstats2')
    })
  })
  
  router.get('/tstats2',function(req,res){
   
    Order2.find({},function(err,docs){
      for(var i = 0; i<docs.length;i++){
        let type = docs[i].type
        let category = docs[i].category
  
        Order2.find({type:type},function(err,tocs){
          let arr=[]
          for(var c = 0;c<tocs.length; c++){
            arr.push(tocs[c].qty)
              }
         let total=0;
          for(var c in arr) { total += arr[c]; }
        
          //subtracting total income from amount owing
         console.log(total,'total')
  
  
         TStats.find({type:type},function(err,locs){
  
          if(locs){
            let id2 = locs[0]._id
            TStats.findByIdAndUpdate(id2,{$set:{qty:total}},function(err,kocs){
  
            })
          }
  
  
  
         })
        })
      }
      res.redirect('/user2')
    })
  })
  

  router.get('/user2',isLoggedIn,function(req,res){
    var id = req.user._id
    Order2.find({},function(err,nocs){
     console.log(nocs.length,'size'+'user2')
        let size = nocs.length
    User.findByIdAndUpdate(id,{$set:{num:size}},function(err,doc){
if(!err){
  res.redirect('/dash')
}
})
      
    })
 
  })
  
  //category Chart 
  
  router.post('/categoryChart', function(req,res){
  
          CStats.find({},function(err,docs){
            if(docs == undefined){
              res.redirect('/')
            }else
        
               res.send(docs)
           
            
             })
        
        })
  
  
  
       
  
  
  
        router.get('/dash',isLoggedIn,function(req,res){
          var pro = req.user
            res.render('index',{pro:pro})
          })
  
  
          router.post('/typeChart', function(req,res){
  
            TStats.find({},function(err,docs){
              if(docs == undefined){
                res.redirect('/')
              }else
          
                 res.send(docs)
             
              
               })
          
          })
    

  
router.get('/addCategory',isLoggedIn,function(req,res){
  var pro = req.user
    res.render('catg',{pro:pro})
  })
  
  
  router.post('/addCategory', isLoggedIn,  function(req,res){
    var pro = req.user
   name = req.body.name;
        req.check('name','Enter Name Of Category').notEmpty();
  
      
        
        var errors = req.validationErrors();
             
        if (errors) {
        
          req.session.errors = errors;
          req.session.success = false;
          res.render('catg',{ errors:req.session.errors,pro:pro})
        
      }
      else{
        
        Make.findOne({'name':name})
          .then(cat =>{
              if(cat){ 
    
             req.session.message = {
              type:'errors',
               message:'Make already exists'
             }     
                res.render('catg', {
                   message:req.session.message ,pro:pro
                })
              }else
      
        var cat = new Make();
      
        cat.name = name;
     
       
     
      
      
        cat.save()
          .then(cat =>{
           
            req.session.message = {
              type:'success',
              message:'Make added'
            }  
            res.render('catg',{message:req.session.message,pro:pro});
        
      
        })
      
          .catch(err => console.log(err))
        
        
        })
      }
      
      
  })
  
  
  router.get('/products',isLoggedIn, (req, res) => {
    var pro = req.user
    Product.find({},(err, docs) => {
        if (!err) {
            res.render("list", {
               list:docs,pro:pro
              
            });
        }
    });
    });
    
    
    
  
  
  
  
  
  
  router.get('/catgSeq',isLoggedIn,function(req,res){
    var pro = req.user
    var arr1=[]  
    Make.find({}, function(err,docs){
      arr1=docs;
    res.render('batch',{arr1:arr1,pro:pro})
  
    })
    
    })
    
    router.post('/catgSeq',isLoggedIn, function(req,res){
         var pro = req.user

  var category = req.body.category
    var id = req.user._id;
   
    
      req.check('category','Enter Category').notEmpty();
  
     
      var errors = req.validationErrors();
      if (errors) {
     
        req.session.errors = errors;
        req.session.success = false;
        res.render('batch',{errors:req.session.errors,pro:pro})
     
      
     }
     else
    User.findOne({ 'id':id})
    .then(clax =>{
        if(clax){ 
       User.findByIdAndUpdate(id,{$set:{ category:category}},function(err,docs){
    console.log(id)
    
       })
       res.redirect('/typeX')
    
        }else
    
        req.session.message = {
          type:'errors',
          message:'User does not exist'
        }   
      res.render('batch',{message:req.session.message, pro:pro});
      
    
    
    
      })
    
    })
    
  
    router.get('/typeX',isLoggedIn,function(req,res){
  
       var pro = req.user.category
       console.log(pro,'pro')
        res.render('type',{pro:pro})
    
    
        
        })
  
        router.post('/typeX', isLoggedIn,  function(req,res){
          var pro = req.user
            name = req.body.category;
            type = req.body.type;
                 req.check('category','Enter Name Of Category').notEmpty();
                 req.check('type','Enter Type of Product').notEmpty();
               
                 
                 var errors = req.validationErrors();
                      
                 if (errors) {
                 
                   req.session.errors = errors;
                   req.session.success = false;
                   res.render('type',{ errors:req.session.errors,pro:pro})
                 
               }
               else{
                 
                   Category.findOne({'name':name,'type':type})
                   .then(cat =>{
                       if(cat){ 
             
                      req.session.message = {
                       type:'errors',
                        message:'Type already exists'
                      }     
                         res.render('type', {
                            message:req.session.message ,
                         })
                       }else
               
                       Category.findOne({'name':name})
                       .then(cat =>{
                      console.log(cat._id,'cat')
  
                        Category.findByIdAndUpdate(cat._id,{$set:{ type:type}},function(err,docs){
                            console.log('klopp')
                            
                               })
  
                              
                           })
                          
                
                           res.redirect('/typeX')
               
               
               
                 })
               }
               
               
           })
         
  
  
    /*
    router.get('/import',function(req,res){
      res.render('imports')
    })
    
  
    
    router.post('/import', upload.single('file'),  (req,res)=>{
     
    
      if(!req.file){
          req.session.message = {
            type:'errors',
            message:'Select File!'
          }     
            res.render('imports/students', {message:req.session.message}) 
          }else if (req.file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
              req.session.message = {
                  type:'errors',
                  message:'Upload Excel File'
                }     
                  res.render('imports', {message:req.session.message
                       
                   }) 
    
    
    
          }
            
          else{
       
  
          
              const file = req.file.filename;
      
              
                   var wb =  xlsx.readFile('./public/uploads/' + file)
           
                   var sheets = wb.Sheets;
                   var sheetNames = wb.SheetNames;
       
                   var sheetName = wb.SheetNames[0];
       var sheet = wb.Sheets[sheetName ];
       
          for (var i = 0; i < wb.SheetNames.length; ++i) {
           var sheet = wb.Sheets[wb.SheetNames[i]];
       
           console.log(wb.SheetNames.length)
           var data =xlsx.utils.sheet_to_json(sheet)
               
           var newData = data.map(async function (record){
       
          
         
        
            
           
  
  
            
  
  req.body.name = record.name     
  req.body.price = record.price  
  req.body.description = record.description 
  req.body.status = record.status  
  req.body.category = record.category  
  req.body.title = record.title
  req.body.filename = record.filename  
             
  
              
          
              try{
                req.check('price','Enter price').notEmpty();
                req.check('name','Enter Name').notEmpty();
                req.check('description','Enter Description').notEmpty();
                req.check('status','Enter status').notEmpty();
                req.check('title','Enter Title').notEmpty();
                req.check('filename','Enter Filename').notEmpty();
             
  
  
                var errors = req.validationErrors();
    
                if (errors) {
                  
                  req.session.errors = errors;
                  req.session.success = false;
                  for(let x=0;x<req.session.errors.length;x++){
                    throw new SyntaxError(req.session.errors[x].msg +" "+"on line")
                  }
                
            }
  
  
        
          
            var product = new Product();
                    product.name = req.body.name;
                    product.price = req.body.price
                    product.description = req.body.description;
                    product.status = req.body.status;
                    product.category= req.body.category;
                    product.title = req.body.title
                    product.filename = req.body.filename;
              
                  
                   
                    product.save()
                      .then(productId =>{
  
                     
                      })
               
                       
                   
                       
                     
                      // .catch(err => console.log(err))
                    }
                    catch(e){
                      res.send(e.message)
                     }
                      })
                    
                    
           
                    }
                    
                    
                      
                      
          
                     
          
                      
               
                  }
        
          
    
    
    })
    
  
  
  
  
  
  
  
  
  */
  
  
  
  
  
  
  

router.get('/addProducts',function(req,res){
   
    Product.find(function(err,docs){
        res.render('add',{products:docs})
    })
    
})





router.post('/addProducts',upload.single('file'),function(req, res, next) {

  
        req.check('name','Enter Product Name').notEmpty();
        req.check('price','Enter Price').notEmpty().isNumeric();
        req.check('description','Enter Description').notEmpty();
        req.check('color','Enter Color').notEmpty();
        req.check('category1','Enter Category').notEmpty();
    
    
        if(!req.file){
           
            
              req.session.message = {
                type:'errors',
                message:'Select File!'
              }     
                res.render('add', {message:req.session.message
                })
           
                 
                }
                   
    var errors = req.validationErrors();
    if (errors) {
   
    
      req.session.errors = errors;
      req.session.success = false;
      res.render('add',{ errors:req.session.errors})
        
    
    }
    
                else{
                    const imageFile = req.file.filename;
            
                    var product = new Product();
                            product.name = req.body.name;
                            product.price = req.body.price
                            product.description = req.body.description;
                           
                            product.category= req.body.category1;
                            product.color = req.body.color;
                            product.filename = imageFile;
                            product.status = 'new'
                      
                          
                           
                            product.save()
                              .then(productId =>{
    
                                res.redirect('/addX')
                              })
                            }
               
    })

  
    
    router.get('/importMake',isLoggedIn,function(req,res){
      var pro = req.user
      res.render('importmak',{pro:pro})
    })
    
  
    
    router.post('/importMake',isLoggedIn, upload.single('file'),  (req,res)=>{
      var pro = req.user
    
      if(!req.file){
          req.session.message = {
            type:'errors',
            message:'Select File!'
          }     
            res.render('importmak', {message:req.session.message}) 
          }else if (req.file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
              req.session.message = {
                  type:'errors',
                  message:'Upload Excel File'
                }     
                  res.render('importmak', {message:req.session.message,pro:pro
                       
                   }) 
    
    
    
          }
            
          else{
       
  
          
              const file = req.file.filename;
      
              
                   var wb =  xlsx.readFile('./public/uploads/' + file)
           
                   var sheets = wb.Sheets;
                   var sheetNames = wb.SheetNames;
       
                   var sheetName = wb.SheetNames[0];
       var sheet = wb.Sheets[sheetName ];
       
          for (var i = 0; i < wb.SheetNames.length; ++i) {
           var sheet = wb.Sheets[wb.SheetNames[i]];
       
           console.log(wb.SheetNames.length)
           var data =xlsx.utils.sheet_to_json(sheet)
               
           var newData = data.map(async function (record){
       
          
         
        
            
           
  
  
            
  
  req.body.name = record.name     
  
             
  
              
          
              try{
            
                req.check('name','Enter Name').notEmpty();
   
               
             
  
  
                var errors = req.validationErrors();
    
                if (errors) {
                  
                  req.session.errors = errors;
                  req.session.success = false;
                  for(let x=0;x<req.session.errors.length;x++){
                    throw new SyntaxError(req.session.errors[x].msg +" "+"on line")
                  }
                
            }
  
  
        
          
            var product = new Make();
                    product.name = req.body.name;
                   
              
                  
                   
                    product.save()
                      .then(productId =>{
  
                     
                      })
               
                       
                   
                       
                     
                      // .catch(err => console.log(err))
                    }
                    catch(e){
                      res.send(e.message)
                     }
                      })
                    
                    
           
                    }
                    
                    
                      
                      
          
                     
          
                      
               
                  }
        
          
    
    
    })
    
  
  
  
  
  
  
  
  
  
  
   
router.post('/checkout',isLoggedIn,  function(req, res, next) {
  if (!req.session.cart) {
      return res.redirect('/cart');
  }
  var cart = new Cart(req.session.cart);
  
  var stripe = require("stripe")(
      "sk_test_IbxDt5lsOreFtqzmDUFocXIp0051Hd5Jol"
  );

 

  stripe.charges.create({
      amount: cart.totalPrice * 100,
      currency: "usd",
      source:  "tok_mastercard", // obtained with Stripe.js
      description: "Test Charge"
  }, function(err, charge) {
      if (err) {
     
          console.log(err.message)
          console.log(req.body.slot,'ma1')
          return res.redirect('/cart');
      }
      var order = new Order({
          user: req.user,
          cart: cart,
          paymentId: charge.id
      });
      order.save(function(err, result) {
          req.flash('success', 'Successfully bought product!');
          console.log('success', 'Successfully bought product!');
          req.session.cart = null;
          res.redirect('/');
      });
  }); 
});




    router.get('/orders',isLoggedIn, (req, res) => {
      var pro = req.user
      Order2.find({},(err, docs) => {
          if (!err) {
              res.render("list", {
                 list:docs,pro:pro
                
              });
          }
      });
      });
      


    router.get('/report', isLoggedIn, function (req, res, next) {
      var pro = req.user
      Order.find({}, function(err, orders) {
          if (err) {
              return res.write('Error!');
          }
          var cart;
          orders.forEach(function(order) {
              cart = new Cart(order.cart);
              order.items = cart.generateArray();
          });
          res.render('orders', { orders: orders,pro:pro });
      });
  });


  router.get('/categories',isLoggedIn, (req, res) => {
    var pro = req.user
    Category.find({},(err, docs) => {
        if (!err) {
            res.render("list", {
               list:docs,pro:pro
              
            });
        }
    });
    });

    router.get('/type',isLoggedIn, (req, res) => {
      var pro = req.user
      Category.find({},(err, docs) => {
          if (!err) {
              res.render("list", {
                 list:docs,pro:pro
                
              });
          }
      });
      });


  module.exports = router;

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.redirect('/')
    }
  }
  
    
    