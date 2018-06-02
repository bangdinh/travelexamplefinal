var express = require('express');
var router = express.Router();
var business = require('./Models/business');
var user = require('./Models/user');
var content = require('./Models/content');
var feedback = require('./Models/feedback');
var categories =  require('./Models/categories');
var banner = require('./Models/banner');
var background = require('./Models/background');
var token = 'bang123';
var    db      = require('./dbconnection');

function result(jsob){
    return {"status":"success","elements":jsob};
}
function resultSuccess(){
    return {"status":"success"};
}
function resultFail(){
    return {"status":"fail"};
}
//background

router.get('/background/:id?',function(req,res,next){
   
    if(req.query.id){
            background.getAllBackgroundById(req.query.id,function(err,rows){
                if(err){
                    res.json(err);
                }
                else{
                    if (rows.length <1) {
                        //pass sai
                        res.json(resultFail());
                    }else{
                        res.json({"status":"success","elements":rows});
                    }
                }
            });
       
    }
});

router.post('/background/insert/',function(req,res,next){

    background.createbackground(req.body,function(err,count){
        if(err){
            res.json(resultFail());
        } else{
            res.json(resultSuccess());
        }
    });
});

router.put('/background/update_image/:id?',function(req,res,next){
     background.UpdateBackground(req.query.id,req.body,function(err,count){
         if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});

//update background doanh nghiệp
router.put('/business/update_background/:id?',function(req,res,next){
     business.updateBackgroundBusiness(req.query.id,req.body,function(err,count){
         if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});
//update name doanh nghiệp
router.put('/business/update_name/:id?',function(req,res,next){
     business.updateNameBusiness(req.query.id,req.body,function(err,count){
         if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});

//update name doanh nghiệp
router.put('/business/update_avatar/:id?',function(req,res,next){
     business.updateAvatarBusiness(req.query.id,req.body,function(err,count){
         if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});

//user-login
 router.get('/user/:mail?',function(req,res,next){
   
    if(req.query.mail){
        if (req.query.pass) {
            user.getUserById(req.query.mail,req.query.pass,function(err,rows){
                if(err){
                    res.json(resultFail());
                }
                else{
                    if (rows.length <1) {
                        //pass sai
                        res.json({"status":"-2"});
                    }else{
                        res.json({"status":"success","elements":rows});
                    }
                }
            });
        }else{
            //mail sai hoac chua co pass
            res.json({"status":"-1"});
        }
    }else{
        user.getAllUser(function(err,rows){
        if(err){ 
            res.json(resultFail());
        } else {
            res.json(result(rows));
        }
    });
    }
});

router.get('/filter/user/:id?',function(req,res,next){
   
    if(req.query.id){
        user.getUserFilterById(req.query.id,function(err,rows){
            if(err){
                res.json(resultFail());
            }else{
                res.json(result(rows));
                }
        });
        
    }
});

router.post('/user/insert/',function(req,res,next){

    user.addUser(req.body,function(err,count){
        if(err){
            res.json(resultFail());
        } else{
            res.json(resultSuccess());
        }
    });
});

router.post('/user/insertregister/',function(req,res,next){

    user.addRegisterUser(req.body,function(err,count){
        if(err){
            res.json(resultFail());
        } else{
            res.json(resultSuccess());
        }
    });
});


router.put('/user/update_when_register_business/:id?',function(req,res,next){
     user.updateUserRegisterBusiness(req.query.id,req.body,function(err,count){
         if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});



function getUserDB(mail, done) {
  db.query('SELECT * FROM users WHERE mail = ? LIMIT 1', [mail], function(err, rows, fields) {
    if (err) throw err;
    done(rows[0]);
  });
}

// router.post('/user/insertregister/',function(req,res,next){

//     if (!req.body.mail || !req.body.password) {
//         return res.status(400).send("You must send the username and the password");
//     }
//     getUserDB(req.body.mail, function(user){
//         if(!user) {
//       user = {
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email
//       };
//   }
//     });
// });


router.post('/user/create', function(req, res) { 
console.log("acn"+req.body.mail)
console.log("acn"+req.body.pass) 
  if (!req.body.mail || !req.body.pass) {
    return res.json(resultFail());
  }
  getUserDB(req.body.mail, function(us){
    if(!us) {
      // us = {
      //   mail: req.body.mail,
      //   pass: req.body.pass,
      // };
        user.addRegisterUser(req.body,function(err,count){
            if(err){
                res.json(resultFail());
            }else{
                res.json(resultSuccess());
            }
        });
    }
    else res.json({"status":"exists"});
    // else res.status(400).send("A user with that username already exists");
  });
});

router.delete('/user/delete/:id?',function(req,res,next){
    user.deleteUser(req.query.id,function(err,count){
        if(err){
                res.json(resultFail());
            }

         else{
                res.json(resultSuccess());
            }
    });
});




router.put('/user/update/:id?',function(req,res,next){
    console.log("Id: ",req.query.id);
    user.updateUser(req.query.id,req.body,function(err,rows){
        if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});


router.put('/user/admin/update/:id?',function(req,res,next){
    user.updateAdminUser(req.query.id,req.body,function(err,rows){
        if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});

router.put('/user/updateb100/:id?',function(req,res,next){
    user.updateUserRegisterBusiness(req.query.id,req.body,function(err,rows){
        if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});

//update user khi xác nhận là doanh nghiệp hoặc hủy
router.put('/user/update_business_accept/:id?',function(req,res,next){
    user.updateAcceptBusiness(req.query.id,req.body,function(err,rows){
        if(err){
            res.json(resultFail());
        } else{
             // user.updateAcceptBusiness(req.query.id);
             // connection.query('UPDATE users SET Name = ? WHERE UserID = ?', [name, userId])
            res.json({"status":"success"});

        }
    });
});


//Admin xác nhận là doanh nghiệp
// router.put('/user/update_ub100/:id?',function(req,res,next){
//     user.updateAcceptBusiness(req.query.id,function(err,rows){
//         if(err){
//             res.json(resultFail());
//         } else{
//             // console.log("update_business_accept "+req.query.uc105);
//              // user.updateAcceptBusiness(req.query.id,req.query.uc105,function(err1,rows1){
                
//              // });
//              res.json({"status":"success"});
//         }
//     });
// });

//end user-login'
//categories
router.get('/categories/:id?',function(req,res,next){
   
    if(req.query.id){
        
            categories.getCategoriesById(req.query.id,function(err,rows){
                if(err){
                    res.json(err);
                }
                else{
                    if (rows.length <1) {
                        //pass sai
                        res.json(resultFail());
                    }else{
                        res.json(result(rows[0]));
                    }
                }
            });
       
    }else{
        categories.getAllCategories(function(err,rows){
        if(err){ 
            res.json(resultFail());
        } else {
            res.json(result(rows));
        }
    });
    }
});

router.post('/categories/insert/',function(req,res,next){
    user.addCategories(req.body,function(err,count){
        if(err){
            res.json(resultFail());
        } else{
            res.json(resultSuccess());
        }
    });
});

router.delete('/categories/delete/:id',function(req,res,next){
    user.deleteCategories(req.query.id,function(err,count){
        if(err){
            res.json(resultFail());
        } else{
          res.json(resultSuccess());
        }
    });
});

router.put('/categories/update/:id',function(req,res,next){
    user.updateCategories(req.query.id,req.body,function(err,rows){
        if(err){
            res.json(resultFail());
        } else{
            res.json(rows);
        }
    });
});

 //business
 router.get('/business/:id?',function(req,res,next){
   
    if(req.query.id){
            business.getBusinessById(req.query.id,function(err,rows){
                if(err){
                    res.json(err);
                }
                else{
                    if (rows.length <1) {
                        //pass sai
                        res.json(resultFail());
                    }else{
                        res.json(result(rows[0]));
                    }
                }
            });
    
    }else{
        business.getAllBusiness(function(err,rows){
        if(err){ 
            res.json(resultFail());
        } else {
            res.json(result(rows));
        }
    });
    }
});

 router.get('/filter/business/:id?',function(req,res,next){
   
    if(req.query.id){
        business.getFilterBusiness(req.query.id,function(err,rows){
            if(err){
                res.json(resultFail());
            }else{
                res.json(result(rows));
                }
        });
        
    }else{
        business.getAllBusiness(function(err,rows){
            if(err){ 
                res.json(resultFail());
            } else {
                res.json(result(rows));
            }
        });
    }
});

router.post('/business/insert/',function(req,res,next){
    business.addBusiness(req.body,function(err,count){
        if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});

router.put('/business/updateimg/:id?',function(req,res,next){
    business.updateImageCoverBusiness(req.query.id,req.body,function(err,rows){
        if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});


//Admin xác nhận là doanh nghiệp
router.put('/business/update_business_accept/:id?',function(req,res,next){
    business.updateAcceptBusiness(req.query.id,function(err,rows){
        if(err){
            res.json(resultFail());
        } else{
            // console.log("update_business_accept "+req.query.uc105);
             // user.updateAcceptBusiness(req.query.id,req.query.uc105,function(err1,rows1){
                
             // });
             res.json({"status":"success"});
        }
    });
});


router.delete('/business/delete/:id?',function(req,res,next){
        business.deleteBusiness(req.query.id,function(err,count){
             if(err){
                res.json(resultFail());
            } else{
                res.json(resultSuccess());
            }
        });
});

//content
router.get('/content/:id?',function(req,res,next){
   
    if(req.query.id){
            content.getContentById(req.query.id,function(err,rows){
                if(err){
                    res.json(resultFail());
                }
                else{
                    if (rows.length <1) {
                        //pass sai
                        res.json({"status":"-2"});
                    }else{
                        res.json(result(rows));
                    }
                }
            });
    
    }else{
        content.getAllContent(function(err,rows){
        if(err){ 
            res.json(resultFail());
        } else {
            res.json(result(rows));
        }
    });
    }
});

router.post('/content/insert/',function(req,res,next){
    content.addContent(req.body,function(err,count){
        if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});

router.delete('/content/delete/:id?',function(req,res,next){
    // if (req.query.id) {

        content.deleteContent(req.query.id,function(err,count){
             if(err){
                res.json(resultFail());
            } else{
                res.json(resultSuccess());
            }
        });
    // }else{
    //      res.json(resultFail());
    // }
});

router.put('/content/update/:id?',function(req,res,next){
    content.updateContent(req.query.id,req.body,function(err,rows){
        if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});
//end-content
// feedback---
router.get('/feedback/:id?',function(req,res,next){
    if(req.query.id){
       feedback.getFeedBackById(req.query.id,function(err,rows){
            if(err){
                res.json(err);
            }else{
                if (rows.length <1) {
                        //pass sai
                    res.json(resultFail());
                }else{
                   res.json({"status":"success","elements":rows});
                }
            }
        });
    
    }else{
        feedback.getAllFeedBack(function(err,rows){
            if(err){ 
                res.json(resultFail());
            } else {
                res.json(result(rows));
            }
        });
    }
});

router.get('/rating/feedback/:id?',function(req,res,next){

    if(req.query.id){
        feedback.getTBSao(req.query.id,function(err,rows){
            if(err){
                res.json(resultFail());
            }else{
                res.json(rows[0]);
                }
        });
        
    }
});

router.post('/insert/feedback/',function(req,res,next){
    feedback.addFeedBack(req.body,function(err,count){
        if(err){
            res.json(resultFail());
        } else{
            res.json({"status":"success","elements":[req.body]});
        }
    });
});

router.delete('/delete/feedback/:id?',function(req,res,next){
    feedback.deleteFeedBack(req.query.id,function(err,count){
        if(err){
            res.json(resultFail());
        } else{
          res.json(resultSuccess());
        }
    });
});

router.put('/update/feedback/:id?',function(req,res,next){
    feedback.updateFeedBack(req.query.id,req.body,function(err,rows){
        if(err){
            res.json(resultFail());
        } else{
            res.json(rows);
        }
    });
});

//banner
router.get('/banner',function(req,res,next){
    banner.getAllBanner(function(err,rows){
        if(err){ 
            res.json(resultFail());
        } else {
            res.json(result(rows));
        }
    });
});

router.put('/update/banner/:id?',function(req,res,next){
    banner.updateBanner(req.query.id,req.body,function(err,rows){
        if(err){
            res.json(resultFail());
        } else{
           res.json({"status":"success","elements":[req.body]});
        }
    });
});

// var path = require('path'),
//     fs = require('fs');
// // ...
// app.post('/upload', function (req, res) {
//     var tempPath = req.files.file.path,
//         targetPath = path.resolve('./uploads/image.png');
//     if (path.extname(req.files.file.name).toLowerCase() === '.png') {
//         fs.rename(tempPath, targetPath, function(err) {
//             if (err) throw err;
//             console.log("Upload completed!");
//         });
//     } else {
//         fs.unlink(tempPath, function () {
//             if (err) throw err;
//             console.error("Only .png files are allowed!");
//         });
//     }
//     // ...
// });



module.exports=router;