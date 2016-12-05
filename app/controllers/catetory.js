/**
 * Created by fuzhihong on 16/11/30.
 */
/**
 * Created by fuzhihong on 16/11/28.
 */
var Movie=require('../models/movie');
var underscore=require('underscore');
var Catetory=require('../models/catetory');

//新建或者修改电影
exports.save=function(req,res){
    var _catetory=req.body.catetory;
    var catetory =new Catetory(_catetory);
    catetory.save(function(err,catetory){
            res.redirect('/admin/catetory/list')
        })
};

// admin page
exports.create=function(req,res){
    res.render('catetory',{
        title:'小电影 后台分类录入页',
        catetory:{
            name:''
        }
    })
};

exports.list=function(req,res){
    Catetory.fetch(function(err, catetories) {
        if (err) {
            console.log(err)
        }
        res.render('catetorylist', {
            title: '小电影 分类列表页',
            catetories: catetories
        })
    })
};


//list delete
exports.del=function(req,res){
    var id=req.query.id
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){console.log(err)}
            else{
                res.json({success:1})
            }
        })
    }

};